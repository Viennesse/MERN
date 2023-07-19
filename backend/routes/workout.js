const express = require("express")
const { createWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController.js")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth.js")

router.use(requireAuth)

// GET all workouts
router.get("/", getWorkouts)

//GET single workout
router.get("/:id", getSingleWorkout)

//POST a new workout
router.post("/", createWorkout)

//DELETE workout
router.delete("/:id", deleteWorkout)

//Update a workout
router.patch("/:id", updateWorkout)

module.exports = router;