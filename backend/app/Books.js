import conn from "./Conn.js";

class Books {
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

    async deleteBook(id) {
        const sql = `DELETE FROM books WHERE BookID = ?`;

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

    async addBook(book) {
        const sql = `INSERT INTO books (BookID, author, title, publisher, the_year_of_publishing,
            description, language, number_of_pages, cover, weight, ISBN, itemcode, price, discounted_price, book_url)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        
        //HOZZÁADÁSNÁL MAJD A COOKIES BEÁLLÍTÁS ÉS JOGOSULTSÁG ELLENŐRZÉSE FONTOS LESZ!! EL NE FELEJTSÜK!!!
        //book MELLETT userID és isAdmin PARAMÉTER IS KELLENI FOG!!!!!!!🤐🤐🤐

        try {
            const response = await conn.promise().query(sql,
            [
                book.bookID, //fontos, hogy a fronted-től a formObject kulcsa bookID nevű legyen. Pl bookID = 2 HA nem akkor a táblába NULL érék kerül!!!
                book.author, //fontos, hogy a fronted-től a formObject kulcsa author nevű legyen. Pl author = Jóska
                book.title,  //fontos, hogy a fronted-től a formObject kulcsa title nevű legyen. Pl title = Béla
                book.publisher, //fontos, hogy a fronted-től a formObject kulcsa publisher nevű legyen. Pl publisher = Gizi
                book.the_year_of_publishing, //u.a.
                book.description, //u.a.
                book.language, //u.a.
                book.number_of_pages, //u.a.
                book.cover, //u.a.
                book.weight, //u.a.
                book.Isbn, //u.a.
                book.itemcode, //u.a.
                book.price, //u.a.
                book.discounted_price, //u.a.
                book.book_url //u.a.
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

    async updateBook(book) {
        const sql = `UPDATE books
        SET author = ?, title = ?,
        publisher = ?, the_year_of_publishing = ?,
        description = ?, language = ?, number_of_pages = ?,
        cover = ?, weight = ?, ISBN = ?, itemcode = ?, price = ?,
        discounted_price = ?, book_url = ? WHERE BookID = ?`;

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
                book.Isbn, //u.a.
                book.itemcode, //u.a.
                book.price, //u.a.
                book.discounted_price, //u.a.
                book.book_url, //u.a.
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