const express = require('express')
const router = express.Router();
const checkAuth = require('../config/checkAuth')
const User = require('../model/User')
const Task = require('../model/User').Task

router.get('/',checkAuth,(req,res)=>{
    
    //console.log(req.user)
    res.render('todo')

});





//SAVING THE TODO
router.post('/',checkAuth,(req,res)=>{
    console.log(req.user.email)
    var email = req.user.email
    User.findOne({email:req.user.email},function(err,data){
        if(err)
        {
            console.log(err)
        }
        else
        {
           var newtask ={
                    task:req.body.task.trim(),
                    checked:false
                }
                data.tasks.push(newtask)
                data.save((err,data)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                    else{
                        console.log("UPDATED DATA")
                        console.log(data)
                    }
                   
                })
        }
    })
    
    console.log(req.body)
    res.redirect('/todo')
});


//LOGOUT 
router.get('/logout',checkAuth,(req,res)=>{
    req.logOut()
    res.redirect('/login')
})



// TO COMPLETE THE TASK
router.post('/checktask',checkAuth,(req,res)=>{
    console.log(req.body)
    var task = req.body.task
    User.findOne({email:req.user.email},function(err,data)
    {
        if(err)
        {
            console.log(err)
        }
        else{
            //TRYIN TO USE FIILTER JS
            //SEARCH THE DB WITH EMAIL
            //and then the togglin happens
            //using the IF statement
            data.tasks.forEach(element => {
                console.log(typeof element.task)
                if(element.task == task[0])
                {
              
                    if(element.checked){
                        element.checked = false
                    }
                    else{
                        element.checked = true
                    }
                }
            });
            console.log(typeof task[0])
            data.save((err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log("DATA UPDATED FOR THE CHECKED VALUE")
                    console.log(data)
                }
            })
        }
    })
    //SENDING THE RESPONSE
    res.json({status:"success"})
})
























































router.post('/deletetask',checkAuth,(req,res)=>{
    //console.log(req.user)
    console.log(req.body)
    var task = req.body.task
    User.findOne({email:req.user.email},function(err,data)
    {
        if(err)
        {
            console.log(err)
        }
        else{
            //TRYIN TO USE FIILTER JS
            //SEARCH THE DB WITH EMAIL
            //and then the togglin happens
            //using the IF statement
            var positontoDel;
            data.tasks.forEach((element,i) => {
                console.log(typeof element.task)
                if(element.task == task[0])
                {
                    // WE ACCESING the Positon of the element
                    // by comparing the JSON file From Front End
                    //and comparing it with DB Data Using IF
                    //saving the position to VAR
                    positontoDel = i
                    
                }
            });
            //DELETING THE ELEMENT
            data.tasks.splice(positontoDel,1)
            data.save((err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log("DATA UPDATED FOR DELETED")
                }
            })
        }
    })
    //SENDING THE RESPONSE
    res.json({status:"success"})
})
module.exports = router