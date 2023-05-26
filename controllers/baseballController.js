const mongodb = require("../db/mongodb");
const ObjectId = require("mongodb").ObjectId;

const getAllPlayers = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOnePlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
      // console.log(lists)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    console.log(`req.body: ${req.body}`);
    const player = {
      name: req.body.name,
      age: req.body.age,
      hometown: req.body.hometown,
      team: req.body.team,
      handedness: req.body.handedness,
      hrs: req.body.hrs,
      average: req.body.average,
    };
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .insertOne(player);
    res.setHeader("Content-Type", "application/json");
    console.log(result);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    const userId = new ObjectId(req.params.id);
    const player = {
      name: req.body.name,
      age: req.body.age,
      hometown: req.body.hometown,
      team: req.body.team,
      handedness: req.body.handedness,
      hrs: req.body.hrs,
      average: req.body.average,
    };
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .updateOne({ _id: userId }, { $set: player });
    console.log(result);
    if (result.modifiedCount > 0) {
      res.status(204).send({ message: "Update successful." });
    } else {
      res
        .status(500)
        .json(
          result.error || "Some error occurred while updating the contact."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  if (!req.params.id) {
    res.status(400).send({ message: "id can not be missing!" });
    return;
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .deleteOne({ _id: userId });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ message: "delete successful for _id:" + userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPlayers,
  getOnePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
