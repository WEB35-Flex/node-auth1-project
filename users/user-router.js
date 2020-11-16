const express = require("express");

const Users = require("./user-model");

const authenticateUser = require("../auth/authenticate-user");

const router = express.Router();

router.get("/", authenticateUser, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
