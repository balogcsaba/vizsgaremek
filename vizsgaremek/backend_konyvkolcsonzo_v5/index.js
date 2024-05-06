import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Categories from "./app/Categories.js";
import Books from "./app/Books.js";
import conn from "./app/Conn.js";
import User from "./app/User.js";

import crypto from 'crypto';
import BorrowedBooks from "./app/BorrowedBooks.js";

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
const u = new User();
const bo = new BorrowedBooks();



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

//Könyvek lekérése categoryID alapján
//pl. http://localhost:3001/books/category/3

app.get("/books/category/:id", async (req, res)=> {
    const response = await b.getBooksCatID(req.params.id);
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
//pl. DELETE http://localhost:3001/books/60     TESZTELVE POSTMAN-NEL

app.delete("/books/:id", async (req, res)=> {
    const response = await b.deleteBook(req.params.id, req.cookies.userID, req.cookies.isAdmin); //COOKIES!!! KELL MAJD MÉG PARAMÉTER userID és isAdmin!!!!!!
    res.status(response.status).send(response.messages);
});

//Könyv hozzáadása
//pl. POST http://localhost:3001/books   TESZTELVE POSTMAN-NEL CATEGORYID-T FRONTENDTŐL KAPJUK
/*
body-ba:
{
  
  "author":"Jóósasdka",
  "title":"Egy asascím",
  "publisher":"Mitsaastomén",
  "the_year_of_publishing":1111,
  "description":"Blablablallvbllaslasla",
  "language":"magyar",
  "number_of_pages":666,
  "cover":"puha",
  "weight":280,
  "ISBN":1234567891234,
  "itemcode":780,
  "price":3334533,
  "discounted_price":22232,
  "book_url ":"",
  "categoryID":"3"
}
*/
app.post("/books", async (req, res)=> {
    const response = await b.addBook(req.body, req.cookies.userID, req.cookies.isAdmin); //COOKIES!!! KELL MAJD MÉG PARAMÉTER userID és isAdmin!!!!!!
    res.status(response.status).send(response.messages);
});

//Könyv módosítása
//pl. PUT http://localhost:3001/books/81      TESZTELVE POSTMAN-NEL
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
  "ISBN":1234567891234,
  "itemcode":780,
  "price":3334533,
  "discounted_price":22232,
  "book_url ":""
}
*/

app.put("/books/:id", async (req, res)=> {
    const books = req.body;
    books.bookID = req.params.id;

    const response = await b.updateBook(books, req.cookies.userID, req.cookies.isAdmin); //COOKIES!!! KELL MAJD MÉG PARAMÉTER userID és isAdmin!!!!!!

    res.status(response.status).send(response.messages);
});

//Könyv keresés név kezdőbetű alapján
//pl. http://localhost:3001/books/search/p     TESZTELVE POSTMAN-NEL

app.get("/books/search/:char", async (req, res)=> {
    const response = await b.serchBooks(req.params.char);
    res.status(response.status).send(response.messages);
});

app.post("/regisztracio", async(req, res)=> {   //TESZTELVE
    try {
        const response = await u.register(req.body);

        res.status(response.status).json(response.messages);
    } catch(err) {
        res.status(err.status).json(err);
    }
});

app.post("/belepes", async (req, res)=> {  //TESZTELVE
    try {
        const response = await u.login(req.body, res);
        res.status(response.status).json(response.messages);
    } catch(err) {
        res.status(err.status).json(err);
    }
});

//Jelszó módosítása ha létezik a user táblában az emailcím 
//pl. PUT http://localhost:3001/resetpass

/*body-ba:
{
    "email":"fek94688@ilebi.com",
    "pass":"alma"
}
*/

app.put("/resetpass", async (req, res)=> {  //POSTMAN-NEL TESZTELVE
    const response = await u.resetPass(req.body);
    res.status(response.status).json(response.messages);

})

//Összes kölcsönzött könyv lekérése + INNER JOINNAL szerepel benne a könyv címe és a user neve is
//pl. http://localhost:3001/admin/borrowedbooks  //POSTMAN-NEL TESZTELVE

app.get("/admin/borrowedbooks", async (req, res)=> { 
    const response = await bo.getBorBooks();
    res.status(response.status).send(response.messages);
});

//userID alapján a kikölcsönzött könyvek megjelenításe - userID-hoz általában az admin fér hozzá, ezért úgy állítottam be hogy az isAdmin értéke 1 legyen
//+ INNER JOINNAL szerepel benne a könyv címe és a user neve is

//pl. http://localhost:3001/admin/borrows/user/1    //POSTMAN-NEL TESZTELVE

app.get("/admin/borrows/user/:id", async (req, res)=> {
    const response = await bo.getBorrowsByUserID(req.params.id, req.cookies.isAdmin); 
    res.status(response.status).send(response.messages);
});


//cartID alapján a kikölcsönzött könyvek megjelenításe - cartID-hoz általában az admin fér hozzá, ezért úgy állítottam be hogy az isAdmin értéke 1 legyen
//+ INNER JOINNAL szerepel benne a könyv címe és a user neve is

//pl. http://localhost:3001/admin/borrows/cart/17   //POSTMAN-NEL TESZTELVE

app.get("/admin/borrows/cart/:id", async (req, res)=> {
    const response = await bo.getBorrowsByCartID(req.params.id, req.cookies.userID, req.cookies.isAdmin); 
    res.status(response.status).send(response.messages);
});

//UserID alapján, csak a USER saját megrendeléseit látja!!!!(!!!!!!a UserID a cookies - ból jön így a belépett felhasználó csak a saját rendeléseit listáztathatja ki) a kikölcsönzött könyvek megjelenítése + INNER JOINNAL szerepel benne a könyv neve is nem csak a BookID; UserID a cookieból jön!!!
//pl. http://localhost:3001/user/borrows     //POSTMAN-NEL TESZTELVE

app.get("/user/borrows", async (req, res)=> {
    const response = await bo.getBorrowsByUser(req.cookies.userID);
    res.status(response.status).send(response.messages);
})





//Könykölcsönzés felvitele
//pl.POST http://localhost:3001/borrows  //POSTMAN-NEL TESZTELVE - KEZELI AZT IS HA KÉTSZER AKARJA KIVENNI A KÖNYVET ÉS MÉG NEM VITTE VISSZA

/*
body-ba:
{
    "bookID":"3",
    "cartID":"17", //frontend oldaról jön ezért nem autoincrement
    "end_of_borrowment":"2024-12-21",
    "quantity":"1",
    "start_of_borrowment":"2024-12-18"

}
 */
app.post("/borrows", async (req, res)=> { //userID a cookies-ból jön!!!!!! a belépett felhasználó tud csak kölcsönözni, cartID a megbeszéltek szerint a frontendről jön és nem autoincrement
    const borrowData = req.body.borrowbooks;
    console.log(borrowData[0]);
    borrowData.userID = req.cookies.userID;
    console.log(borrowData.userID);
    console.log(typeof(borrowData.userID));
    const response = await bo.addBorrow(borrowData);
    res.clearCookie("userID");
    res.clearCookie("isAdmin");
    res.clearCookie("email");
    res.status(response.status).send(response.messages);
});

//Kölcsönzések módosítása (a megbeszéltek alapján a bringedBAck értékét 1-re módosítani) cartID alapján
//pl. PUT http://localhost:3001/admin/borrows/cart/19       //POSTMAN-NEL TESZTELVE - Ha nem talál rendelésazonosító alapján hibát jelez

/*
body-ba:
{
 "bringedBack":"1" "  
}
*/

app.put("/admin/borrows/cart/:id", async (req, res)=> {
    const order = req.body;
    order.cartID = req.params.id;
    const response = await bo.updateOrder(order,req.cookies.isAdmin); 
    res.status(response.status).send(response.messages);
});

//Kölcsönzés törlése cartID alapján
//pl. DELETE http://localhost:3001/admin/borrows/cart/19     //POSTMAN-NEL TESZTELVE - Ha nem talál rendelésazonosító alapján hibát jelez

app.delete("/admin/borrows/cart/:id", async (req, res)=> {
    const response = await bo.deleteOrder(
        req.params.id,
        req.cookies.userID,
        req.cookies.isAdmin
    );

    res.status(response.status).send(response.messages)
});

//USER törlése a user táblából
//pl. DELETE http://localhost:3001/admin/users/23    //POSTMAN-NEL TESZTELVE - Ha nem talál USERID alapján hibát jelez

app.delete("/admin/users/:id", async (req, res)=> {
    const response = await u.deleteUser(
        req.params.id,
        req.cookies.userID,
        req.cookies.isAdmin
    );
    res.status(response.status).send(response.messages)

});

//Összes user lekérése adminként
//pl. GET http://localhost:3001/admin/users  //POSTMAN-NEL TESZTELVE - Jogosultságot ellenőriz!

app.get("/admin/users", async (req, res)=> {
    const response = await u.getUsers(req.cookies.isAdmin); 
    res.status(response.status).send(response.messages);
});

//User keresés név kezdőbetű alapján
//pl. http://localhost:3001/admin/users/search/p     TESZTELVE POSTMAN-NEL

app.get("/admin/users/search/:char", async (req, res)=> {
    const response = await u.searchUsers(req.params.char);
    res.status(response.status).send(response.messages);
});

//User adatainak kilistázása cookies-ból
//pl http://localhost:3001/user  //FONTOS, HOGY BE LEGYEN JELENTKEZVE MERT SÜTIBŐL SZEDI A USERID-T - POSTMAN-NEL TESZTELVE
app.get("/user", async (req, res)=> {
    const response = await u.getProfile(req.cookies.userID);
    res.status(response.status).send(response.messages);
})





app.listen(3001, ()=>{console.log("Az alkalmazás a 3001-es porton fut! 😎")});