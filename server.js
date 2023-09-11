const express = require("express");
const app = express();
const routers = require("./routers/index");
const { conn } = require("./config/mysql");
const port = process.env.PORT | 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routers);

app.listen(port, async () => {
  try {
    await conn.connect();
    console.log("db conn succeed");
    console.log(`server open ${port}`);
  } catch (err) {
    console.err(err.message);
  }
});
