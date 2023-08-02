const router=require('express').Router();
const {check,validationResult}=require('express-validator');
const users=require('../userList');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const JWT=require('jsonwebtoken');

router.post("/signup",[
    check("fullName","Please enter a valid name")
        .isLength({min:6}),
    check("email","please provide a valid email")
        .isEmail(),
    check("password","Password's length should not be less than 6")
        .isLength({min:6})
    ]
,async (req,res)=>{
    const {fullName,email,password}=req.body;
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(
            {
                errors:errors.array(),
            }
        )
    }
    let emailExist= await users.findOne({email:req.body.email})
    if (emailExist){
        res.status(400).json({
            "msg":"User already exist"
        })
    }else{
    let hashedPassword= await bcrypt.hash(password,10);
    users.create({
        fullName,
        email,
        password:hashedPassword
    })

    
    const token=await JWT.sign({
        fullName,email},'dwd54gfd9f65g4sdfhgw9r564ghts',{expiresIn:"1h"}
    )
        res.json({
            token
        })
        
}

});
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    let emailExist= await users.findOne({email:req.body.email});
    if (!emailExist){
        res.status(400).json({
            "msg":"invalid email"
        })}
        let isMatch= await bcrypt.compare(password,emailExist.password)
        if (isMatch==false){
            res.status(400).json(
                {
                    "msg":"invalid password"
                }
            )

        }
        else{
            const token=await JWT.sign({
        email},'dwd54gfd9f65g4sdfhgw9r564ghts',{expiresIn:"1h"}
    )
        res.json({
            token
        })

        }
})


module.exports=router;