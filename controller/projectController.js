const express = require('express');
const websocket = require('socket.io');

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
    // just check if this post is for the creation of the record or the update

    if (req.body._id === ""){
        insertProject(req,res);
    }
    else {
        updateRecord(req,res);
    }
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

// create route to display all projects
function getListofUsers() {
    router.get('/list', (req, res) => {
        Project.collection.find().toArray(function (err, docs){
            if (!err){
                res.render('project/list', {
                    list:docs
                });
            }
        });
    });
}
getListofUsers();



// create route to update a single project by its id

router.get('/:id', (req, res) => {
    Project.findById(req.params.id,(err, doc) => {
        // check for error
        if (!err){
        res.render('project/addOrEdit', ({
          viewTitle:'Update Project',
          project:doc
        }))}
    }).lean();
})

router.get('/delete/:id', (req, res) => {
    Project.findOneAndRemove(req.params.id, (err, doc) => {
        if (!err){
            res.redirect('/project/list');
        }
        else {
            console.log("An error occured when deleting a record" + err);
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

function updateRecord(req,res){
    Project.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err, doc) => {
        // if no error is here
        if (!err){
            res.redirect('project/list');
        }
        else {
            // if any error is found
            if (err.name === "ValidationError"){
                handleValidationError(err, req.body);
                res.render('project/addOrEdit', ({
                    viewTitle: 'Update Project',
                    project:req.body
                }))
            }
            else {
                console.log("error occured when updating the record" + err);
            }
        }
    })
}


module.exports = router;