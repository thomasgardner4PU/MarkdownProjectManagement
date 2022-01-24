// title // fullname // description // city
// schema

const { MongoGridFSChunkError } = require('mongodb');
const mongoose = require('mongoose');

let projectSchema = new mongoose.Schema({
    title: {
        type:String
    },
    email:{
        type:String
    },
    fullname:{
        type:String
    },
    description:{
        type: String
    }
})

mongoose.model('Project', projectSchema);