import mysql from "mysql2";

const conn = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"konyvkolcsonzo"
});

export default conn;