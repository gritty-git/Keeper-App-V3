const express = require('express');
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const noteTemplateCopy = require('../models/NoteModels')
const passport = require("passport");
const User = signUpTemplateCopy;

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
require('dotenv').config();

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/signup', function(req,res){

    User.register({username: req.body.username},
         req.body.password,
          function(err, user){
        if (err) {
          console.log(err);
          res.send(false);
          //res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function(){
            //res.redirect("/secrets");
            if(res){
              res.send(true);
            }
          });
        }
      });
    
})

router.post("/login", function(req, res){

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    
    req.login(user, function(err){
      if (err) {
        console.log(err);
        
      } else {
        passport.authenticate("local")(req, res, function(){
          //res.redirect("/secrets");
          if(res){
              res.send(true);

          }else{
              res.send("Wrong Creds");
          }
        });
      }
    });
  
});

router.post('/addNote', function(req,res){
    const Note = new noteTemplateCopy({
        username:req.body.username,
        title:req.body.title,
        content:req.body.content
    })
    Note.save()
    .then(function(data){
        res.json(data)
    })
    .catch(function(e){
        res.json(e)
    })
})
router.get("/getNotes", function(req,res){
    noteTemplateCopy.find({},function(err, notes){
        res.send(notes);
    })
})

router.post("/deleteNotes", function(req,res){
    
    noteTemplateCopy.deleteOne(
        {username:req.body.username,title: req.body.title, content: req.body.content},
        function(err){
            
            if(!err){
                res.send("Successfully deleted");
            }else{
                res.send(err);
            }
        }
    )
})

module.exports = router