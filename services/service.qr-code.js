const { text } = require("express");
const qr = require("qrcode");
class ServiceQRCode {
  static generateQRCode(token) {
    return new Promise((resolve, reject) => {
      const respondText = `api/${token}`;
      qr.toDataURL(respondText, (err, data_url) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data_url);
        }
      });
    });
  }
}

//ServiceQRCode.generateQRCode("asd");
module.exports = { ServiceQRCode };
