// title // fullname // description // city
// schema

// const { MongoGridFSChunkError } = require('mongodb');
const mongoose = require('mongoose');

const validator = require('email-validator');

const projectSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true

    },
    fullname:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
});

projectSchema.path('email').validate((val) => {
    return validator.validate(val);
}, "Invalid Email")


module.exports = mongoose.model('Project', projectSchema);