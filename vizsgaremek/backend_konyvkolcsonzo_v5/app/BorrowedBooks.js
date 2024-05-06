import CheckPermission from "./CheckPermission.js";
import conn from "./Conn.js";




class BorrowedBooks {
 
    async getBorBooks() {
        const sql = `SELECT borrowedbooks.BookID, borrowedbooks.cartID,
                        DATE_FORMAT(borrowedbooks.end_of_borrowment, '%Y-%m-%d') as end_of_borrowment,
                        borrowedbooks.quantity,
                        DATE_FORMAT(borrowedbooks.start_of_borrowment, '%Y-%m-%d') as start_of_borrowment,
                        borrowedbooks.UserID, borrowedbooks.bringedBack
                        ,books.title, users.Name FROM borrowedbooks
                        INNER JOIN books
                        ON books.BookID = borrowedbooks.BookID
                        INNER JOIN users
                        ON users.UserID = borrowedbooks.UserID`;

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

    async getBorrowsByUser(userID) {
        const sql = `SELECT borrowedbooks.BookID, borrowedbooks.cartID,
                    DATE_FORMAT(borrowedbooks.end_of_borrowment, '%Y-%m-%d') as end_of_borrowment,
                    borrowedbooks.quantity,
                    DATE_FORMAT(borrowedbooks.start_of_borrowment, '%Y-%m-%d') as start_of_borrowment,
                    borrowedbooks.UserID, borrowedbooks.bringedBack, books.title
                    FROM borrowedbooks
                    INNER JOIN books
                    ON books.BookID = borrowedbooks.BookID
                    WHERE UserID = ?`;

        if(userID === null || userID === undefined) {
            return {
                status:403,
                messages:["Nincs jogosultságod megtekinteni az adatokat!"]
            }
        }

        try {
            const response = await conn.promise().query(sql, [userID]);

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
    
    async getBorrowsByCartID(CartID, userID, isAdmin) {
        const sql = `SELECT borrowedbooks.BookID, borrowedbooks.cartID,
                        DATE_FORMAT(borrowedbooks.end_of_borrowment, '%Y-%m-%d') as end_of_borrowment,
                        borrowedbooks.quantity,
                        DATE_FORMAT(borrowedbooks.start_of_borrowment, '%Y-%m-%d') as start_of_borrowment,
                        borrowedbooks.UserID, borrowedbooks.bringedBack, 
                        books.title, users.Name FROM borrowedbooks
                        INNER JOIN books
                        ON books.BookID = borrowedbooks.BookID
                        INNER JOIN users
                        ON users.UserID = borrowedbooks.UserID WHERE cartID = ?`;

        

        if(!CheckPermission(userID, isAdmin, true)) {
            return {
                status:403,
                messages:["Nincs jogosultságod megtekinteni az adatokat!"]
            }
        }

       

        try {
            const response = await conn.promise().query(sql, [CartID]);
            if(response[0].length !==0)
            {
                return {
                    status:200,
                    messages:response[0]//
                };
            }else {
                return {
                    status:404,
                    messages:["A keresett erőforrás nem található!"]
                };
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

    async getBorrowsByUserID(userID, isAdmin) {
        const sql = `SELECT borrowedbooks.BookID, borrowedbooks.cartID,
                        DATE_FORMAT(borrowedbooks.end_of_borrowment, '%Y-%m-%d') as end_of_borrowment,
                        borrowedbooks.quantity,
                        DATE_FORMAT(borrowedbooks.start_of_borrowment, '%Y-%m-%d') as start_of_borrowment,
                        borrowedbooks.UserID, borrowedbooks.bringedBack, 
                        books.title, users.Name FROM borrowedbooks
                        INNER JOIN books
                        ON books.BookID = borrowedbooks.BookID
                        INNER JOIN users
                        ON users.UserID = borrowedbooks.UserID WHERE borrowedbooks.UserID = ?`;

        if(isAdmin === null || isAdmin === undefined || isAdmin === "0") {
            return {
                status:403,
                messages:["Nincs jogosultságod megtekinteni az adatokat!"]
            }
        }

       

        try {
            const response = await conn.promise().query(sql, [userID]);
            if(response[0].length !==0)
            {
                return {
                    status:200,
                    messages:response[0]
                };
            }else {
                return {
                    status:404,
                    messages:["A keresett erőforrás nem található!"]
                };
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
    
    async checkBorrows(bookID, userID) {
        const sql = `SELECT COUNT(*) as BookNumber 
        FROM borrowedbooks WHERE BookID = ? 
        AND bringedBack = ? AND UserID = ?`;

        try {
            const response = await conn.promise().query(sql, [bookID, 0, userID]);
            return parseInt(response[0][0].BookNumber);
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

    async checkCartID(cartID) { //???????? szerintem nem kell mert több cartID is mehet a táblába!!!!!!!
        const sql = `SELECT COUNT(*) as CartIDNumber 
        FROM borrowedbooks WHERE cartID = ?`;

        try {
            const response = await conn.promise().query(sql, [cartID]);
            return parseInt(response[0][0].CartIDNumber);
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

    async addBorrow(borrowDatas) {
      

        const errors = [];
        const successes = [];
        if(borrowDatas.userID === null || borrowDatas.userID === undefined || borrowDatas.userID === "")
            errors.push("Nincs jogosultságod a művelet elvégzéséhez. Kérlek jelentkezz be!")
        if(await this.checkBorrows(borrowDatas.bookID, borrowDatas.userID) > 0)
            errors.push("Már kivettél egy ilyen könyvet, és még nem hoztad vissza!");

            if(errors.length > 0) {
                return {
                    status:400,
                    messages:errors
                }
            }

        for (let borrowData of borrowDatas) {
            
            const sql = `INSERT INTO borrowedbooks 
            (BookID, cartID, end_of_borrowment, quantity, start_of_borrowment, UserID)
            VALUES(?,?,?,?,?,?)`;
            

            try {
                
                    const response = await conn.promise().query(sql, [
                        borrowData.BookID,
                        borrowData.cartID,                     
                        borrowData.end_of_borrowment,
                        borrowData.quantity,
                        borrowData.start_of_borrowment,
                        borrowData.UserID
                    ]);
                    const successMessage = "[Sikeres kölcsönzés!]";
                    if(!successes.includes(successMessage))
                    {
                        successes.push(successMessage);
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

        if(successes.length > 0) {
            return {
                status:200,
                messages:successes
            };
        }

               
            
    }

    async updateOrder(borrowData, isAdmin) { 
        const sql = `UPDATE borrowedbooks SET bringedBack = ?
                    WHERE cartID = ?`;
        
                    if(isAdmin === null || isAdmin === undefined || isAdmin === "0") {
                        return {
                            status:403,
                            messages:["Nincs jogosultságod felülírni a megrendelést!"]
                        }
                    }

                    try {
                        const response = await conn.promise().query(sql,
                        [
                            borrowData.bringedBack,
                            borrowData.cartID,
                            
                        ]);

                        if(response[0].affectedRows > 0) {
                            return {
                                status:200,
                                messages:["Sikeres felülírás!"]
                            }
                        }else {
                            return {
                                status:404,
                                messages:["A megadott azonosító alapján nem található megrendelés! "]
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

    async deleteOrder(cartID, userID, isAdmin) {
        const sql = `DELETE FROM borrowedbooks WHERE cartID = ?`;

        if(!CheckPermission(userID, isAdmin, true)) {
            return {
                status:403,
                messages:["Nincs jogosultságod törölni a bejegyzést!"]
            }
        }

        try {
            const response = await conn.promise().query(sql, [cartID]);

            if(response[0].affectedRows === 1) {
                return {
                    status:200,
                    messages:["Sikeres törlés!"]
                }
            } else {
                return {
                    status:404,
                    messages:["A megrendelés nem található a megadott azonosító alapján!"]
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
}
export default BorrowedBooks;