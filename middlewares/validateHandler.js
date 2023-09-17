const md5 = require("md5");
require("dotenv").config();
const isValidateHandler = (req, res, next) => {
  console.log(req.method);
  if (req.method == "GET") {
    const secret = req.query.secretKey;
    if (!secret) throw new Error("not access");
    if (secret !== process.env.SERVER_HASH) throw new Error("not access");
    return next();
  } else if (req.method == "POST") {
    const secret = req.headers.Authorization;
    if (!secret) throw new Error("not access");
    if (secret !== process.env.SERVER_HASH) throw new Error("not access");
    return next();
  }
};

module.exports = { isValidateHandler };
