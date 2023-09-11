const jwt = require("jsonwebtoken");
const secret = require("../config/token").secret;
class ServiceJWT {
  static async generateToken(payload, expiresIn) {
    try {
      const token = await jwt.sign(payload, secret, {
        expiresIn: expiresIn,
      });
      return token;
    } catch (err) {
      throw err;
    }
  }
  static async decodeAndVerifyToken(token) {
    try {
      const plainText = await jwt.verify(token, secret);
      return plainText;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = { ServiceJWT };
