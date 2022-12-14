/*********************************************************************************
* WEB322 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: __Damanjot Singh____ Student ID: __148285216_____ Date: ____30/10/2022_____
*
* Online (Heroku) URL:
* ______https://navy-blue-bison-sari.cyclic.app____________________
*
********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const fs = require('fs');
const multer = require('multer');
var path = require('path');
var dataservice = require(__dirname + "/data-service.js");

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
});


onHttpStart = ()=>{
    console.log('Express http server listening on port ' + HTTP_PORT);
}
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/home.html"));
});
app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", (req, res)=>{
    dataservice.getAllEmployees().then((data) =>{
        res.json({data});
    }).catch((err)=>{
        res.json({message: err});
    })
});

app.get('/employees/add',(req,res) => {
    res.sendFile(path.join(__dirname + "/views/addEmployee.html"));

});


app.post('/employees/add', (req,res) => {
    dataservice.addEmployee(req.body).then(() => {
        res.redirect("/employees");
    })
});


app.get('/images/add',(req,res) => {
    res.sendFile(path.join(__dirname + "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), (req,res) => 
{ 
    res.redirect("/images");
});


app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err,items) {
        res.json(items);
    })
});



app.get("/managers", (req, res)=>{
    dataservice.getManagers().then((data) =>{
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/departments", (req, res)=>{
    dataservice.getDepartments().then((data)=>{
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});
app.use((req, res)=>{
    res.status(404).end('404 PAGE NOT FOUND');
});

dataservice.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log('promises not stisfied');
});