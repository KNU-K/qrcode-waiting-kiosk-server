const express = require("express");
const app = express();

const port = process.env.PORT | 8000;

app.listen(port, async () => {
  try {
    console.log(`server open ${port}`);
  } catch (err) {
    console.err(err.message);
  }
});
