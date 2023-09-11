const router = require("express").Router();
const qrRouter = require("./qr.router");
const authRouter = require("./auth.router");
/**
 * api rendering
 */
router.use("/qr", qrRouter);
router.use("/auth", authRouter);

module.exports = router;
