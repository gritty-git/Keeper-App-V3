const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routesUrls = require('./routes/routes')
const cors = require('cors')
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require("passport");
const cookieParser = require('cookie-parser');

dotenv.config()


mongoose.connect(process.env.DB_ACCESS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});


const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors())

app.use(session({
    secret: "Our little secret for Keeper APP.",
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser("Our little secret for Keeper APP."));
  
app.use(passport.initialize());
app.use(passport.session());

app.use('/app', routesUrls)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../Keeper-App-front/build')));
    app.get('*',(req,res)=>
        res.sendFile(path.resolve(__dirname,'..', 'Keeper-App-front', 'build', 'index.html'))
    );
}else{
    app.get('/',(req,res)=>{
        res.send('API is Running');
    });
}

app.listen(PORT, function(){
    console.log("Server running at 4000");
})
