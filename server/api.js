/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Garden = require("./models/garden");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.post("/garden", (req, res) => {
  Garden.findOne({ googleid: req.body.googleid }).then((existingGarden) => {
    if (!existingGarden) {
      const garden = new Garden(req.body);
      garden.save();
      console.log("creating new garden", req.body);
      return res.send({ msg: "garden created" });
    }
    existingGarden.updateOne(req.body);
    res.send({ msg: "garden updated" });
  });
});

router.get("/garden", (req, res) => {
  Garden.findOne({ googleid: req.query.googleid }).then((existingGarden) => {
    if (!existingGarden) {
      return res.status(400).send({ msg: "bad request" });
    }
    res.send(existingGarden);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
