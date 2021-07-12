const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req,res)=>{
    try {
        // generate new password
        
        //create new user

        // save the user and send response

    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;


