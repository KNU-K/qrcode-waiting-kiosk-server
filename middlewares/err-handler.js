const ErrorHandler = (err, req, res, next) => {
  res.json({ msg: "fail" });
};
module.exports = { ErrorHandler };
