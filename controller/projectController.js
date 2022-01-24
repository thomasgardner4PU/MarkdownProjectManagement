const express = require('express');

const mongoose = require('mongoose');
const e = require("express");

// include the model class
const Project = mongoose.model('Project');

const router = express.Router();

// route of projects
router.get('/', (req, res) => {
    res.render('project/addOrEdit.hbs', {
        viewTitle: "Insert Project"
    })
});

// handle the post request
router.post('/', (req, res) => {
    // creating custom function

    insertProject(req,res);
});

function insertProject(req,res) {

    let project = new Project();

    project.title = req.body.title;
    project.email = req.body.email;
    project.fullname = req.body.fullname;
    project.description = req.body.description;

    //checking for validation
    if (project.title === "" || project.email === "" || project.fullname === "" || project.description === ""){
        res.render('project/addOrEdit.hbs', {
            viewTitle:'Insert Project',
            error:'Enter all the details',
            project:req.body
        })

        return;
    }

    project.save((err, doc) => {
        // if there is no error

        if(!err){
            res.redirect('project/list');
        }
        else{

            if (err.name === "ValidationError"){
                handleValidationError(err, req.body);

                res.render('project/addOrEdit', {
                    viewTitle:'Insert project',
                    project:req.body
                })
            }

            console.log("An error was detected while inserting a record");
        }
    });
}

// create route to display all users

// router.get('/list', (req,res) => {
//     Project.collection.find((err, docs).toArray() => {
//         if (!err){
//             res.render('project/list', {
//                 list:docs
//             });
//         }
//     })
// }

router.get('/list', (req, res) => {
    Project.collection.find().toArray(function (err, docs){
        if (!err){
            res.render('project/list', {
                list:docs
            })
        }
    })
})

function handleValidationError(err,body){
    for (field in err.errors){
        switch(err.errors[field].path){
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;

            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:

                break;
        }
    }
}

module.exports = router;