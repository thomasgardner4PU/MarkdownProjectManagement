
const mongoose = require('mongoose');

const url = "mongodb+srv://tguop2021:inctVlOgj8JcW7BK@cluster0.riszx.mongodb.net/projectsDB?retryWrites=true&w=majority"

// connect method of mongoose

mongoose.connect(url, {useNewUrlParser:true}, (err) => {
    if(!err) {
        console.log("mongodb connection is successful");
    }
    else {
        // if any error is there

        console.log("An error occured when connecting to mongodb" + err);
    }
})

// include the project model
require('../models/project.model');