const redis = require("redis");

const config = {
  host: "kiosk-redis",
  port: 6379,
};

module.exports = {
  client: redis.createClient(config),
};
