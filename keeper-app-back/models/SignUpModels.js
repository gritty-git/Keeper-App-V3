const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");

const signUpTemplate = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
});

signUpTemplate.plugin(passportLocalMongoose);

var User = new mongoose.model('user', signUpTemplate);

module.exports = User