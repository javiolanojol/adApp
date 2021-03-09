'use strict'
const express= require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path");
const port = 8000;


require('./dbConnection');

app.set('views', path.join(__dirname, 'views'));

app.engine(
    "hbs",
    handlebars({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs"
    })
);

app.set('view engine', 'hbs');

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(require ("./routes/indexRouter.js"));
app.use("/ads",require ("./routes/adsRouter.js"));

app.listen(port, () => console.log(`Listening at port: ${port}`));