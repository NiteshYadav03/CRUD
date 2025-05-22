const express = require('express')
const router= express.Router()
const {body, validationResult} = require('express-validator')
 const userModel = require('../models/user.model')
 const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/register',(req,res)=>{
    res.render('register')
}
)

router.post('/register',
  
    body('username').trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').trim().isLength({min:10})
        .isEmail().withMessage('Enter a valid email'),
    body('password').trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
,
    async (req,res)=>{

        const errors=validationResult(req)
         
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid data'
            })
        }



     const {email,username,password}=req.body
     const hashPassword=await bcrypt.hash(password,10)
    const newUser=await userModel.create({
        email,
        username,
        password:hashPassword
    })
    res.send(newUser)
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({min:3,message:"Invalid"}),
    body('password').trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ,async (req,res)=>{
        const errors= validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid data'
            })
        }

        const {username,password}=req.body
        const user=await userModel.findOne({
            username:username
        })
        if(!user){
            return res.status(400).json({
               
                message:"username or password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status.json({
                message:'usernaem or password is incorrect'
            })
        }

        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },
        process.env.JWT_SECRET,
    )

    res.cookie('token',token)

    res.send('Logged in')

})

module.exports = router