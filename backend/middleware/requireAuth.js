const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req,res,next) => {
    const {authorization} = req.headers
    console.log("REQUEST HEADERS", req.headers)
    if(!authorization) {
        res.status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1]
    console.log("TO JEST AUTHORIZATION " ,authorization)
    try {
        console.log( "TOKEN :", jwt.verify(token, process.env.SECRET))
        const {_id} = jwt.verify(token, process.env.SECRET) 
        req.user = await User.findOne({_id}).select("_id") //  // store user data in request object
        console.log("REQ.USER : ", req.user)
        next()    
        /*const user = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne(user._id).select("_id")
        next()
        */
    }
    // jwt.verify returns us token or payload from that token, so we grab the id from that token(payload)
    // req.user can be named not necessary user:  req.blabla
    catch(error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
    
}

module.exports = requireAuth   // to dajemy do routes/workout.js, aby wszystkie routes byly proteccted (dzieki next())





