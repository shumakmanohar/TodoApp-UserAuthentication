const express = require('express')
const app = express()
const mongoose = require("mongoose")
const session = require('express-session')
const flash = require("connect-flash")
const passport = require("passport")
const initializePassport = require('./config/passport')
initializePassport(passport)
//Mongodb
mongoose.connect('mongodb://localhost/todoApp')
.then(console.log("MongoDb Connected Succesfully",{useNewUrlParser:true  }))
.catch(err=> console.log(err))
//Bodyparser
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'1mb'}))
//MIDDLEware
app.use('/asset',express.static(__dirname +'/asset'))
//Ejs
app.set('view engine','ejs')

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
 app.use(function(req, res, next) {
   
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.details = req.user
    next()
 });
//Routes
app.use('/',require('./routes/routes'))
app.use('/todo',require('./routes/todo'))





app.listen(80,()=> console.log("web hosted in 80 port"))
