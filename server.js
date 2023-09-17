const express = require("express");
const app = express();
const routers = require("./routers/index");
const { conn } = require("./config/mysql");
const { client } = require("./config/redis");
const session = require("express-session");
const passport = require("passport");
const server_http_port = process.env.PORT | 8000;
const server_https_port = process.env.PORT | 8002;
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const md5 = require("md5");
const { ErrorHandler } = require("./middlewares/err-handler");
const { isValidateHandler } = require("./middlewares/validateHandler");

const options = {
  key: fs.readFileSync("./config/cert.key"),
  cert: fs.readFileSync("./config/cert.crt"),
};
app.use(cors());
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
app.use(ErrorHandler);

https.createServer(options, app).listen(server_https_port, () => {
  console.log("HTTPS server start..!");
});

app.listen(server_http_port, async () => {
  try {
    await conn.connect();
    console.log("db conn test succeed");
    await client.connect();
    console.log("redis conn test succeed");
    console.log(`server open ${server_http_port}`);
  } catch (err) {
    console.error(err.message);
  }
});
