const { default: mongoose } = require("mongoose")
const Workout = require("../models/workoutModel.js")

//Get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id 
    const workouts = await Workout.find({user_id}).sort({createdAt: -1}) // wczesniej szukalismy wszystkich workouts: Workout.find( {})
    res.status(200).json(workouts)
    
}

//Get single workout
const getSingleWorkout = async(req,res) => {
    const { id } = req.params
    console.log(req.params)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findById({_id: id})  // == findOne({ _id: req.params.id  })

    if(!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

//Create workout
const createWorkout = async (req,res) => {
    const {title, load, reps} = req.body

    const emptyFields = []
    if(!title) {
        emptyFields.push("title")
    }
    if(!load) {
        emptyFields.push("load")
    }
    if(!reps) {
        emptyFields.push("reps")
    }
    if(emptyFields.length > 0) {
        res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try {
        const user_id = req.user._id 
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error){
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


//Delete workout

const deleteWorkout = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findByIdAndDelete({_id: id}) // mozna tez tak: findByIdAndDelete(id)
    if(!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}


//Update workout
const updateWorkout = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout,
}


