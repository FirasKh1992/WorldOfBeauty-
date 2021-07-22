const express=require('express');
const router = express.Router();


//@route  GET api/auth
//@desc   Test route
//@aceess Public -> there is no need for access token to use this route  
router.get('/',(req,res)=>{
    res.send('get request from auth');
})
module.exports = router;