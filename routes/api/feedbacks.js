const express=require('express');
const router = express.Router();


//@route  GET api/feedbacks
//@desc   Test route
//@aceess Public -> there is no need for access token to use this route  
router.get('/',(req,res)=>{
    res.send('get request from feedback');
})

module.exports = router;