const express = require("express");
const app = express();
const routers = require("./routers/index");
const { conn } = require("./config/mysql");
const { client } = require("./config/redis");
const session = require("express-session");
const passport = require("passport");
const port = process.env.PORT | 8000;

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: { httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routers);

app.listen(port, async () => {
  try {
    await conn.connect();
    console.log("db conn test succeed");
    await client.connect();
    console.log("redis conn test succeed");
    console.log(`server open ${port}`);
  } catch (err) {
    console.err(err.message);
  }
});
