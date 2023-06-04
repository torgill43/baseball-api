// const mongodb = require("../db/mongodb");
// const ObjectId = require("mongodb").ObjectId;
// const createError = require("http-errors");

// const getAllTeams = async (req, res, next) => {
//   // #swagger.tags= ['Teams']
//   try {
//     const result = await mongodb.getDb().db("MLB").collection("teams").find();
//     result.toArray().then((lists) => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200).json(lists);
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getOneTeam = async (req, res, next) => {
//   // #swagger.tags= ['Teams']
//   try {
//     const teamId = req.params.id;
//     // Validate teamId
//     if (!ObjectId.isValid(teamId)) {
//       throw createError(400, "Invalid team ID.");
//     }
//     // ^ thanks chatGPT ^

//     const userId = new ObjectId(teamId);
//     const result = await mongodb
//       .getDb()
//       .db("MLB")
//       .collection("teams")
//       .find({ _id: teamId });

//     const hasTeam = await result.hasNext(); // Check if cursor has any documents
//     // ^ thanks chatGPT ^

//     if (!hasTeam) {
//       throw createError(404, "team does not exist.");
//     }

//     result.toArray().then((lists) => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200).json(lists[0]);
//       // console.log(lists)
//     });
//   } catch (err) {
//     // res.status(500).json({ message: err.message });
//     next(err);
//   }
// };

// const createTeam = async (req, res, next) => {
//   // #swagger.tags= ['Teams']
//   try {
//     console.log(`req.body: ${req.body}`);
//     const team = {
//       name: req.body.name,
//       age: req.body.age,
//       hometown: req.body.hometown,
//       team: req.body.team,
//       handedness: req.body.handedness,
//       hrs: req.body.hrs,
//       average: req.body.average,
//     };
//     const result = await mongodb
//       .getDb()
//       .db("MLB")
//       .collection("teams")
//       .insertOne(team);
//     res.setHeader("Content-Type", "application/json");
//     console.log(result);
//     res.status(201).json({ id: result.insertedId });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateTeam = async (req, res, next) => {
//   // #swagger.tags= ['Teams']
//   try {
//     const teamId = req.params.id;
//     // Validate teamId
//     if (!ObjectId.isValid(teamId)) {
//       throw createError(400, "Invalid team ID.");
//     }
//     // ^ thanks chatGPT ^

//     const userId = new ObjectId(teamId);
//     const team = {
//       name: req.body.name,
//       age: req.body.age,
//       hometown: req.body.hometown,
//       team: req.body.team,
//       handedness: req.body.handedness,
//       hrs: req.body.hrs,
//       average: req.body.average,
//     };
//     const result = await mongodb
//       .getDb()
//       .db("MLB")
//       .collection("teams")
//       .updateOne({ _id: userId }, { $set: team });
//     console.log(result);
//     if (result.modifiedCount > 0) {
//       res.status(204).send({ message: "Update successful." });
//     } else {
//       throw createError(400, "Team does not exist or no change was made");
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// const deleteTeam = async (req, res, next) => {
//   // #swagger.tags= ['Teams']
//   try {
//     const teamId = req.params.id;
//     // Validate teamId
//     if (!ObjectId.isValid(teamId)) {
//       throw createError(400, "Invalid team ID.");
//     }
//     // ^ thanks chatGPT ^

//     const userId = new ObjectId(teamId);
//     const result = await mongodb
//       .getDb()
//       .db("MLB")
//       .collection("teams")
//       .deleteOne({ _id: userId });

//     if (result.deletedCount === 0) {
//       throw createError(404, "Team does not exist");
//     }
//     // ^ thanks chatGPT ^

//     res.setHeader("Content-Type", "application/json");
//     res.status(200).send({ message: "delete successful for _id:" + userId });
//   } catch (err) {
//     // res.status(500).json({ message: err.message });
//     next(err);
//   }
// };

// module.exports = {
//   getAllTeams,
//   getOneTeam,
//   createTeam,
//   updateTeam,
//   deleteTeam,
// };
