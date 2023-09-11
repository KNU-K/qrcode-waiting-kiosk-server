module.exports = {
  errHandler: (err, req, res, next) => {
    if (err instanceof Error) {
    } else {
    }
    res.send(err);
  },
};
