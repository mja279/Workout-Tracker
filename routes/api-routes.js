const path = require("path");
const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body }, res) => {
  let newExercise = body;
  Workout.updateOne({ "_id": res.req.params.id },{
    $push : {exercises: newExercise}
  })
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
}); 

router.get("/api/workout", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .sort({ date: -1 })
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

router.get("/exercise?", (req, res) => {
  Workout.find({ "_id": req.query.id })
  .then(dbWorkout => {
    // res.json(dbWorkout);
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
