const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "15d"})  
}
// createToken = (_id) => { return jwt.sign({_id: _id})} //  (_id) jako parametr funkcji to dokladnie te drugie _id w 
// jwt.sign({ _id: _id })

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)
        //create a token
        const token = createToken(user._id)
        res.status(200).json({email, token}) // before was res.status(200).json({email,user})
        
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }

}


//login user
const loginUser = async (req, res) => {
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({email,token})

    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = { loginUser, signupUser}