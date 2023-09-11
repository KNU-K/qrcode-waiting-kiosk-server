const router = require("express").Router();
const authRouter = require("./auth.router");
/**
 * api rendering
 */
router.use("/auth", authRouter);
module.exports = router;
