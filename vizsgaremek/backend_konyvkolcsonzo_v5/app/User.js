import conn from "./Conn.js";
import hash from "./hash.js";
import { emailRegex } from "./EmailCheck.js";
import { phoneRegex } from "./PhoneNumberCheck.js";
import crypto from "crypto";
import CheckPermission from "./CheckPermission.js";

class User {

    

    async register(user) {
        const sql = `INSERT INTO users
        (IsAdmin, Name, Phone, Email, Pass, ZIP, City, Address)
        VALUES(?,?,?,?,?,?,?,?)`;

        let errors = [];

        if(!emailRegex.test(user.email)) {
            errors.push("A megadott email cím formátuma nem megfelelő!");
        }

        if(user.pass.length < 8) {
            errors.push("A jelszónak legalább 8 karakteresnek kell lennie!");
        }

        if(user.pass !== user.passAgain) {
            errors.push("A két jelszó nem egyezik meg!");
        }

        if(!phoneRegex.test(user.phone)) {
            errors.push("A telefonszám formátuma érvénytelen. Kérjük, a +36-os országkóddal kezdődő 9 számjegyet adjon meg!")
        }
        if(await this.checkEmail(user.email) !== 0)
            errors.push("A megadott email címmel már regisztráltak a felületen!")

        if(errors.length > 0) {
            return {
                status:400,
                messages:errors
            };
        }

        try {
            await conn.promise().query(sql,
                [
                    false,
                    user.fullName,
                    parseInt(user.phone),
                    user.email,
                    hash(user.pass),
                    user.zip,
                    user.city,
                    user.address
                ]
            );

            return {
                status:200,
                messages:["Sikeres regisztráció!"]
            }
        } catch(err) {
            console.log(err.errno);
            console.log(err.sqlMessage);

            return {
                status:503,
                messages:["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }

    async login(user, res) {
        const sql = `SELECT UserID, IsAdmin, Email FROM users WHERE Email = ? AND PAss = ?`;
        const token = crypto.randomBytes(64).toString('hex'); //??????????? Nem használunk tokent
        try {
            const userData = await conn.promise().query(sql, [user.email, hash(user.pass)]);

            if(userData[0].length === 1) {
                const userID = parseInt(userData[0][0].UserID);
                const isAdmin = parseInt(userData[0][0].IsAdmin);
                const email = userData[0][0].Email;

                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 *1000);
                res.cookie("userID", userID, {expires:expires, httpOnly:true});
                res.cookie("isAdmin", isAdmin, {expires:expires, httpOnly:true});
                res.cookie("email", email, {expires: expires, httpOnly:true});

                return {
                    messages:{isAdmin:isAdmin, email: email, userID:userID, token:token, uzenet:["Sikeres belépés"]},
                    status:200
                };
            } else {
               return { 
                messages:["Nem megfelelő felhasználónév/jelszó páros!"],
                status:403
                };
            }
        } catch(err) {
            console.log(err);
            return {
                status:503,
                messages: ["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }

    async getUsers(isAdmin) {
        const sql = "SELECT * FROM users";

        // if(isAdmin === null || isAdmin === undefined || isAdmin === "0") { ///HIBÁS
        //     return {
        //         status:403,
        //         messages:["Nincs jogosultságod megtekinteni az adatokat!"]
        //     }
        // }

        try {
            const response = await conn.promise().query(sql);

            return {
                status:200,
                messages:response[0]
            }
        } catch(err) {
            console.log(err);
            console.log(err.errno);
            console.log(err.sqlMessage);

            return {
                status:503,
                messages:["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }

    async deleteUser(userID, c_userID, isAdmin) {
        const sql = `DELETE FROM users WHERE UserID = ?`;

        if(!CheckPermission(c_userID, isAdmin, true)) {
            return {
                status:403,
                messages:["Nincs jogosultságod törölni a bejegyzést!"]
            }
        }

        try {
            const response = await conn.promise().query(sql, [userID]);

            if(response[0].affectedRows === 1) {
                return {
                    status:200,
                    messages:["Sikeres törlés!"]
                }
            } else {
                return {
                    status:404,
                    messages:["A felhasználó nem található a megadott ID alapján!"]
                }
            }
        } catch(err) {
            console.log(err);
            console.log(err.errno);
            console.log(err.sqlMessage)

            return {
                status:503,
                messages:["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }

    async checkEmail(email) {
        const sql = `SELECT COUNT(*) as EmailExist 
        FROM users WHERE Email = ?`;

        try {
            const response = await conn.promise().query(sql, [email]);
            return parseInt(response[0][0].EmailExist);
        } catch(err) {
            console.log(err);
            console.log(err.errno);
            console.log(err.sqlMessage);

            return {
                status:503,
                messages:["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }

    async resetPass(user) {
        const sql = `UPDATE users SET Pass = ?
        WHERE Email = ?`;

        try {
            if(await this.checkEmail(user.email) !== 0){
                const response = await conn.promise().query(sql,
                    [
                        hash(user.pass),
                        user.email,
                        
                    ]);
                    if(response[0].affectedRows === 1) {
                        return {
                            status:200,
                            messages:["Sikeres felülírás!"]
                        }
                    }
                
            } else {
                return {
                    status:404,
                    messages:["A megadott email cím nem szerepel az adatbázisban! "]
                }
            }
            
        } catch(err) {
            console.log(err);
                        console.log(err.errno);
                        console.log(err.sqlMessage);

                        return {
                            status:503,
                            messages:["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
                        };
        }
    }

    async searchUsers(char) {
        const sql = `SELECT * FROM users WHERE name LIKE ?`;
        const startingP = `${char}%`; 

        try {
            const data = await conn.promise().query(sql, [startingP]);

            if(data[0].length !== 0) {
                return {
                    status:200,
                    messages: data[0]
                };
            } else {
                return {
                    status: 404,
                    messages:["A keresett erőforrás nem található!"]
                };
            }
        } catch (err) {
            console.log(err);
            console.log(err.errno);
            console.log(err.sqlMessage);

            return {
                status:503,
                messages: ["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }

    async getProfile(userID) {
        const sql = `SELECT * FROM users
                    WHERE UserID = ?`;

        if(userID === null || userID === undefined || userID === "") {
            return {
                status:403,
                messages:["Nem vagy belépve! Kérlek, lépj be előbb a felületre!"]
            }
        }

        try {
            const response = await conn.promise().query(sql, [userID]);
            if(response[0].length == 1)
            {
                return {
                    status:200,
                    messages:response[0][0]
                }
            }
            else{
                return {
                    status:404,
                    messages:["Nem találtam a profilodhoz adatot!"]
                }
            }
           
        } catch(err) {
            console.log(err);
            console.log(err.errno);
            console.log(err.sqlMessage);

            return {
                status:503,
                messages:["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }  

}

export default User;
