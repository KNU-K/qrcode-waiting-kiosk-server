const ErrorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
  } else if (err instanceof CustomError) {
  }
  res.json({ msg: "fail" });
};
module.exports = { ErrorHandler };
