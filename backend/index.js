import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Categories from "./app/Categories.js";
import Books from "./app/Books.js";
import conn from "./app/Conn.js";

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.use(express.json());
app.use(cookieParser());

const c = new Categories();
const b = new Books();

//Kategória lekérése ID alapján
//pl. http://localhost:3001/categories/15

app.get("/categories/:id" , async (req, res)=> {
    const response = await c.getCategory(req.params.id);
    res.status(response.status).send(response.messages);
});

//Összes kategória lekérése
//pl. http://localhost:3001/categories

app.get("/categories", async (req, res)=> {
    const response = await c.getCategories();
    res.status(response.status).send(response.messages);
});

//Könyv lekérése ID alapján
//pl. http://localhost:3001/books/18

app.get("/books/:id", async (req, res)=> {
    const response = await b.getBook(req.params.id); 
    res.status(response.status).send(response.messages);
});

//Összes könyv lekérése
//pl. http://localhost:3001/books

app.get("/books", async (req, res)=> {
    const response = await b.getBooks();
    res.status(response.status).send(response.messages);
});

//Könyv törlése ID alapján
//pl. DELETE http://localhost:3001/books/60

app.delete("/books/:id", async (req, res)=> {
    const response = await b.deleteBook(req.params.id); //COOKIES!!! KELL MAJD MÉG PARAMÉTER userID és isAdmin!!!!!!
    res.status(response.status).send(response.messages);
});

//Könyv hozzáadása
//pl. POST http://localhost:3001/books
/*
body-ba:
{
  "bookID":77,
  "author":"Jóósasdka",
  "title":"Egy asascím",
  "publisher":"Mitsaastomén",
  "the_year_of_publishing":1111,
  "description":"Blablablallvbllaslasla",
  "language":"magyar",
  "number_of_pages":666,
  "cover":"puha",
  "weight":280,
  "Isbn":1234567891234,
  "itemcode":780,
  "price":3334533,
  "discounted_price":22232,
  "book_url ":""
}
*/
app.post("/books", async (req, res)=> {
    const response = await b.addBook(req.body); //COOKIES!!! KELL MAJD MÉG PARAMÉTER userID és isAdmin!!!!!!
    res.status(response.status).send(response.messages);
});

//Könyv módosítása
//pl. PUT http://localhost:3001/books/81
/*
body-ba:
{
  "author":"MÓDOSÍTOTT",
  "title":"MÓDOSÍTOTT",
  "publisher":"MÓDOSÍTOTT",
  "the_year_of_publishing":1111,
  "description":"MÓDOSÍTOTTBlablablallvbllaslasla",
  "language":"magyar",
  "number_of_pages":666,
  "cover":"puha",
  "weight":280,
  "Isbn":1234567891234,
  "itemcode":780,
  "price":3334533,
  "discounted_price":22232,
  "book_url ":""
}
*/

app.put("/books/:id", async (req, res)=> {
    const books = req.body;
    books.bookID = req.params.id;

    const response = await b.updateBook(books); //COOKIES!!! KELL MAJD MÉG PARAMÉTER userID és isAdmin!!!!!!

    res.status(response.status).send(response.messages);
});

app.listen(3001, ()=>{console.log("Az alkalmazás a 3001-es porton fut! 😎")});