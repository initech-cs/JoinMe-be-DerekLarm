const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
var express = require("express");
var router = express.Router();
const {
  getModalEvents,
  getUserModalEvents,
} = require("../controllers/eventController");
const Event = require("../models/event");

/* /EVENT */

router.post("/", async (req, res) => {
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const date = req.body.date;
  const address = req.body.address;
  const rawDate = req.body.rawDate;
  const creatorID = req.body.creatorID;
  const apiDate = req.body.apiDate;

  const newEvent = await Event.create({
    name,
    title,
    description,
    startTime,
    endTime,
    lat,
    lng,
    date,
    address,
    rawDate,
    creatorID,
    apiDate,
  });
  console.log(newEvent);
  res.send(newEvent);
});

router.route("/modal/:user").get(getUserModalEvents);

router.route("/modal").get(getModalEvents);

router.get("/user/:user", async (req, res, next) => {
  try {
    const events = await Event.find({ name: req.params.user });
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.get("/:apiDate", async (req, res) => {
  const events = await Event.find({ apiDate: req.params.apiDate });
  res.send(events);
});

// DELETE PAST EVENTS
router.delete("/past/:apiDate", async (req, res) => {
  const result = await Event.deleteMany({
    apiDate: { "$lt" : req.params.apiDate },
  });
  res.send(result);
});

router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  const result = await Event.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
