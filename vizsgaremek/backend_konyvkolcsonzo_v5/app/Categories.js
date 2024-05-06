import conn from "./Conn.js";

class Categories {
    async getCategory(id) {
        const sql = `SELECT * FROM categories
        WHERE categoryID = ?`;

        try {
            const data = await conn.promise().query(sql, [id]);

            if(data[0].length !==0) {
                return {
                    status:200,
                    messages:data[0][0]
                };
            }else {
                return {
                    status:404,
                    messages:["A keresett erőforrás nem található!"]
                };
            }
        } catch(err) {
            console.log(errr);
            console.log(err.errno);
            console.log(err.sqlMessage);

            return {
                status:503,
                messages:["A szolgáltatás jelenleg nem elérhető! Próbálja meg később!"]
            };
        }
    }

    async getCategories() {
        const sql = "SELECT * FROM categories";

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
}

export default Categories;