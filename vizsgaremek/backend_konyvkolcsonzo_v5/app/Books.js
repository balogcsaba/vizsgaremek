import CheckPermission from "./CheckPermission.js";
import conn from "./Conn.js";

class Books {

    checkErrors(book) {
        const errors = [];

        if(book.author.length === 0
        || book.author === undefined
        || book.author === null){
            console.log(typeof(book));
            errors.push("A szerzőt kötelező beállítani!");
        }
            

        if(book.title.length === 0
        || book.title === undefined
        || book.title === null)
            errors.push("A könyv címét kötelező megadni!");
        
        if(book.publisher.length === 0
        || book.publisher === undefined
        || book.title === null)
            errors.push("A könyv kiadóját kötelező megadni!");    
        
        if(book.the_year_of_publishing === 0
        || book.the_year_of_publishing === undefined
        || book.the_year_of_publishing === null)
            errors.push("A könyv kiadásának évét kötelező megadni!");
        
        if(book.description.length === 0
        || book.description === undefined
        || book.description === null)
            errors.push("A könyv leírását kötelező megadni!");

        if(book.language.length === 0
        || book.language === undefined
        || book.language === null)
            errors.push("A könyv nyelvét kötelező megadni!");

        if(book.number_of_pages === 0
        || book.number_of_pages === undefined
        || book.number_of_pages === null)
            errors.push("A könyv terjedelmét kötelező megadni!");

        if(book.cover.length === 0
        || book.cover === undefined
        || book.cover === null)
            errors.push("A könyv borítójának típusát kötelező megadni!");

        if(book.cover.length === 0
        || book.cover === undefined
        || book.cover === null)
            errors.push("A könyv súlyát kötelező megadni!");
        
          if((!book.ISBN || book.ISBN.length === 0)
          || book.ISBN === undefined
          || book.ISBN === null)
              errors.push("A könyv ISBN számát kötelező megadni!");
        
        // if(!/^([\d]{3}\-[\d]{1}\-[\d]{2}\-[\d]{6}\-[\d]|[\d]{6}\-[\d])$/.test(book.Isbn))
        //     errors.push("Az ISBN azonosító formátuma nem megfelelő!");
        
        if(book.itemcode.length === 0
        || book.itemcode === undefined
        || book.itemcode === null)
            errors.push("A könyv termékkódját kötelező megadni!");
        
        if(book.price === 0
        || book.price === undefined
        || book.price === null)
            errors.push("A könyv árát kötelező megadni!");

        if(book.discounted_price === 0
        || book.discounted_price === undefined
        || book.discounted_price === null)
            errors.push("A könyv kedvezményes árát kötelező megadni!");

        if(book.categoryID === 0
        || book.categoryID === undefined
        || book.categoryID === null)
            errors.push("A könyv kategóriáját kötelező megadni!");
        
        return errors;
    }

    async serchBooks(char) {
        const sql = `SELECT * FROM books WHERE title LIKE ?`;
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
    
    async getBooksCatID(id) {
        const sql = `SELECT * FROM books WHERE categoryID = ?`;

        try {
            const data = await conn.promise().query(sql, [id]);

            if(data[0].length !== 0) {
                return {
                    status:200,
                    messages: data[0]
                };
            } else {
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
                messages: ["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }
    
    
    async getBook(id) {
        const sql = `SELECT * FROM books WHERE BookID = ?`;

        try {
            const data = await conn.promise().query(sql, [id]);

            if(data[0].length !== 0) {
                return {
                    status:200,
                    messages: data[0][0]
                };
            } else {
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

    async getBooks() {
        const sql = "SELECT * FROM books";

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

    async deleteBook(id, userID, isAdmin) {
        const sql = `DELETE FROM books WHERE BookID = ?`;

        if(!CheckPermission(userID, isAdmin, true)) {
            return {
                status:403,
                messages:["Nincs jogosultságod törölni a bejegyzést!"]
            }
        }

        //TÖRLÉSNÉL MAJD A COOKIES BEÁLLÍTÁS ÉS JOGOSULTSÁG ELLENŐRZÉSE FONTOS LESZ!! EL NE FELEJTSÜK!!!
        //id MELLETT userID és isAdmin PARAMÉTER IS KELLENI FOG!!!!!!!🤐🤐🤐
        /*

        */

        try {
            const response = await conn.promise().query(sql, [id]);

            if(response[0].affectedRows === 1) {
                return {
                    status:200, //ha a status code 204 (No Content) nem tudok hozzá üzenetet beállítani, emiatt állítottam be a 200-at!
                    messages:["Sikeres törlés!"]
                }
            } else {
                return {
                    status:404,
                    messages:["Az erőforrás nem található!"]
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

    async addBook(book, userID, isAdmin) {
        const sql = `INSERT INTO books (author, title, publisher, the_year_of_publishing,
            description, language, number_of_pages, cover, weight, ISBN, itemcode, price, discounted_price, book_url, categoryID)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const errors = this.checkErrors(book);

        if(!CheckPermission(userID, isAdmin, true)) {
            return {
                status:403,
                messages:["Nincs jogosultságod létrehozni a bejegyzést!"]
            }
        }

        if(errors.length > 0) {
            console.log(errors);
            return {
                status:400,
                messages:errors
            }
        }
        
        //HOZZÁADÁSNÁL MAJD A COOKIES BEÁLLÍTÁS ÉS JOGOSULTSÁG ELLENŐRZÉSE FONTOS LESZ!! EL NE FELEJTSÜK!!!
        //book MELLETT userID és isAdmin PARAMÉTER IS KELLENI FOG!!!!!!!🤐🤐🤐

        try {
            const response = await conn.promise().query(sql,
            [
                //book.bookID, //fontos, hogy a fronted-től a formObject kulcsa bookID nevű legyen. Pl bookID = 2 HA nem akkor a táblába NULL érék kerül!!!
                book.author, //fontos, hogy a fronted-től a formObject kulcsa author nevű legyen. Pl author = Jóska
                book.title,  //fontos, hogy a fronted-től a formObject kulcsa title nevű legyen. Pl title = Béla
                book.publisher, //fontos, hogy a fronted-től a formObject kulcsa publisher nevű legyen. Pl publisher = Gizi
                book.the_year_of_publishing, //u.a.
                book.description, //u.a.
                book.language, //u.a.
                book.number_of_pages, //u.a.
                book.cover, //u.a.
                book.weight, //u.a.
                book.ISBN, //u.a.
                book.itemcode, //u.a.
                book.price, //u.a.
                book.discounted_price, //u.a.
                book.book_url, //u.a.
                book.categoryID
                //!!! categoryID-t érdemes a felületen egy select mezőből kiválasztani!!!!!! Vagy be lehet állítani
                // hogy a felhasználó beírja kézzel a categoryID-t de akkor valahol fel kellene tüntetni a felületen az ID-kat. ELSŐRE SZAVAZNÉK 🤗

            ]);

            return {
                status:200,
                messages:["Sikeres felvitel!"]
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

    async updateBook(book, userID, isAdmin) {
        const sql = `UPDATE books
        SET author = ?, title = ?,
        publisher = ?, the_year_of_publishing = ?,
        description = ?, language = ?, number_of_pages = ?,
        cover = ?, weight = ?, ISBN = ?, itemcode = ?, price = ?,
        discounted_price = ?, book_url = ?, categoryID = ? WHERE BookID = ?`;

        const errors = this.checkErrors(book);

        if(!CheckPermission(userID, isAdmin, true)) {
            return {
                status:403,
                messages:["Nincs jogosultságod felülírni a bejegyzést!"]
            }
        }

        if(errors.length > 0) {
            return {
                status:400,
                messages:errors
            }
        }

        //MÓDOSÍTÁSNÁL MAJD A COOKIES BEÁLLÍTÁS ÉS JOGOSULTSÁG ELLENŐRZÉSE FONTOS LESZ!! EL NE FELEJTSÜK!!!
        //book MELLETT userID és isAdmin PARAMÉTER IS KELLENI FOG!!!!!!!🤐🤐🤐

        try {
            const response = await conn.promise().query(sql,
            [
                book.author, //fontos, hogy a fronted-től a formObject kulcsa author nevű legyen. Pl author = Jóska HA nem akkor a táblába NULL érék kerül!!!
                book.title,  //fontos, hogy a fronted-től a formObject kulcsa title nevű legyen. Pl title = Béla
                book.publisher, //fontos, hogy a fronted-től a formObject kulcsa publisher nevű legyen. Pl publisher = Gizi
                book.the_year_of_publishing, //u.a.
                book.description, //u.a.
                book.language, //u.a.
                book.number_of_pages, //u.a.
                book.cover, //u.a.
                book.weight, //u.a.
                book.ISBN, //u.a.
                book.itemcode, //u.a.
                book.price, //u.a.
                book.discounted_price, //u.a.
                book.book_url, //u.a.
                book.categoryID,
                book.bookID //u.a. ENDPOINT LÉTREHOZÁSÁNÁL IS!!!

            ]);

            if(response[0].affectedRows === 1) {
                return {
                    status:200,
                    messages:["Sikeres felülírás"]
                }
            } else {
                return {
                status:404,
                messages:["A keresett könyv nem található!"]
                }
            }
        } catch (err) {
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

export default Books;