const router=require('express').Router();
const {check,validationResult}=require('express-validator');
const users=require('../userList');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const JWT=require('jsonwebtoken');

router.post("/signup",[
    check("email","please provide a valid email")
        .isEmail(),
    check("password","Password's length should not be less than 6")
        .isLength({min:6})
    ]
,async (req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(
            {
                errors:errors.array(),
            }
        )
    }
    let user=users.find((user)=>{
        return user.email===email
    })
    if (user){
        res.status(400).json({
            "msg":"User already exist"
        })
    }else{
    let hashedPassword= await bcrypt.hash(password,10);
    users.push({
        email,
        password:hashedPassword
    })
    const token=await JWT.sign({
        email},'dwd54gfd9f65g4sdfhgw9r564ghts',{expiresIn:"1h"}
    )
        res.json({
            token
        })
}
});
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    let user=users.find((user)=>{
        return user.email===email
    });
    if (!user){
        res.status(400).json({
            "msg":"invalid email"
        })}
        let isMatch= await bcrypt.compare(password,user.password)
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
router.get('/all',(req,res)=>{
    res.json(users)
});



module.exports=router;