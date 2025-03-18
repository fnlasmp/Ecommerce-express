const express = require("express");
const app = express();
const port = 3000;

const products = [
    {
        id: 1,
        name: "Iphone 11",
        price: 600,
        image: "images/Iphone-11.jpg",
        stock: 50,        
    },
    {
        id: 2,
        name: "Iphone 15",
        price: 1200,
        image: "images/Iphone-15.jpg",
        stock: 50,        
    },
    {
        id: 3,
        name: "Iphone 16",
        price: 1600,
        image: "images/Iphone-16.jpg",
        stock: 50,        
    },
    {
        id: 4,
        name: "Samsung Galaxy S24",
        price: 1200,
        image: "images/galaxy-s24.jpg",
        stock: 50,        
    },
    {
        id: 5,
        name: "Samsung Galaxy s25",
        price: 1350,
        image: "images/galaxy-s25.jpg",
        stock: 50,        
    },
];

app.get("/api/products", (req, res) => {
    res.send(products);
});

app.use("/", express.static("fe"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});