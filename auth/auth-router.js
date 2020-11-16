const express = require("express");

const bcrypt = require("bcryptjs");

const Users = require("../users/user-model");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  const hash = bcrypt.hashSync(password, 10);
  const user = { username, password: hash, role };

  Users.add(user)
    .then((id) => {
      res.status(201).json({
        message: `registartion successful, your new user id is: ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((users) => {
      const user = users[0];

      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `welcome back ${user.username}` });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/logout", (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy((err) => {
      if (err) res.json({ message: "something happend" });
      else res.json({ message: "goodbye!" });
    });
  } else {
    res.status(200).json({ message: "you are already logged out!" });
  }
});

module.exports = router;
