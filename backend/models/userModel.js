const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require("validator")


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Static signup method
userSchema.statics.signup = async function (email, password){    

  //validation                      //npm validator
  if(!email || !password) {
    throw Error ("All fields must be filled.")
  }
  if(!validator.isEmail(email)) {
    throw Error ("Email is not valid")
  }
  if(!validator.isStrongPassword(password)) {
    throw Error ("Password is not strong enough")
  }

  const exists = await this.findOne({email})      // Normalnie uzylibysmy User, ale nie mamy go jeszcze, bo to jest static method
  if(exists) {                                  // dlatego uzywamy thisjezeli uzywamy this. Funkcja nie moze byc arrow function
    throw Error("Email already in use")         // bo kontekst this bedzie window
  }
  
  const salt = await bcrypt.genSalt(10)         // npm brypt - hash password
  const hash = await bcrypt.hash(password, salt)

  const user = this.create({email, password: hash})

  return user
}


// Staticc login method

userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error("All fields must be filled")
  }

  const user = await this.findOne({email})
  if(!user) {
    throw Error("Incorrect email")
  }

  const match = bcrypt.compare(password, user.password)
  if(!match) {
    throw Error("Incorrect password")
  }

  return user
}


module.exports = mongoose.model("User", userSchema)




