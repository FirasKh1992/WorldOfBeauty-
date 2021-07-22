const express=require('express');
const router = express.Router();


//@route  GET api/users
//@desc   Test route
//@aceess Public -> there is no need for access token to use this route  
router.get('/',(req,res)=>{
    res.send('get request from users');
})


//@route  GET api/users
//@desc   Test route
//@aceess Public -> there is no need for access token to use this route  
router.get('/',(req,res)=>{
    res.send('get request from users');
})




module.exports = router;