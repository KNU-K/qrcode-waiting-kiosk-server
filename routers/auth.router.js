const { client } = require("../config/redis");
const { ServiceJWT } = require("../services/service.jwt");
const { ServiceQRCode } = require("../services/service.qr-code");

const router = require("express").Router();
// TODO: plan implementation
router.post("/register", async (req, res, next) => {
  try {
    const { productName, productPrice } = req.body;
    const payload = {
      productName: productName,
      productPrice: productPrice,
    };
    const token = await ServiceJWT.generateToken(payload, `7d`);
    const data_url = await ServiceQRCode.generateQRCode(token);
    client.set(token, "new");
    res.setHeader("Content-Type", "image/png");

    res.send(Buffer.from(data_url.split(",")[1], "base64"));
  } catch (err) {
    next(err);
  }
});

router.get("/mobile-register", async (req, res, next) => {
  try {
    const { productName, productPrice } = req.body;
    const payload = {
      productName: productName,
      productPrice: productPrice,
    };
    const token = await ServiceJWT.generateToken(payload, `7d`);
    const data_url = await ServiceQRCode.generateQRCode(token);
    client.set(token, "new");
    res.setHeader("Content-Type", "image/png");

    res.send(Buffer.from(data_url.split(",")[1], "base64"));
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { token } = req.query;
    console.log(token);
    if ((await client.get(token)) !== "new") throw new Error("unavailable");
    const decodedData = await ServiceJWT.decodeAndVerifyToken(token);
    await client.set(token, "old");
    res.send({ msg: "succeed", state: 200, data: decodedData });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
