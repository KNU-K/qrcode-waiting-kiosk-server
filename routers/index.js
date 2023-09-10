const router = require("express").Router();
const qrRouter = require("./qr.router");

/**
 * api rendering
 */
router.use("/qr", qrRouter);

module.exports = router;
