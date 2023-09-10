const { ServiceJWT } = require("../services/service.jwt");
const { ServiceQRCode } = require("../services/service.qr-code");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const token = await ServiceJWT.generateToken({ test: "test" }, "15m");
    const data_url = await ServiceQRCode.generateQRCode(token);
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(data_url.split(",")[1], "base64"));
  } catch (err) {
    throw err;
  }
});

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;
    const plainText = await ServiceJWT.decodeAndVerifyToken(token);
    res.send({ msg: "good", text: plainText });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
