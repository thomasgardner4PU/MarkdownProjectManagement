require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHandlebars = require('express-handlebars');

let app = express();

// middleware
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json()); // it will eb converting all the request data to json format

// configuring the views of application
app.set('views', path.join(__dirname, '/views/'));

app.engine('hbs', expressHandlebars.engine({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutDir: __dirname + '/views/'
}));

app.set('view engine', 'hbs'); // successfully configured the express handlebars

// configuring the route for the home page
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(5000, () => {
    console.log("Server is running on Port 5000");
})