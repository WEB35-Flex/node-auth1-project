const express = require("express");

const helmet = require("helmet");

const session = require("express-session");
const sessionStore = require("connect-session-knex")(session);

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");

const server = express();

const message = process.env.MESSAGE;

server.use(helmet());
server.use(
  session({
    name: "monster",
    secret: "this should come from process.env",
    cookie: {
      maxAge: 1000 * 30,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new sessionStore({
      knex: require("../data/db-config"),
      tablename: "sessions",
      sidfieldname: "sid",
      createTable: true,
      clearInterval: 1000 * 60 * 60,
    }),
  })
);
server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send(message);
});

module.exports = server;
