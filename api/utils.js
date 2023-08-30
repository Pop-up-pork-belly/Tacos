async function requireUser(req, res, next) {
  if (!req.user) {
    // console.log(req.user);
    res.status(403).json({
      error: "Not Authorized",
      message: "You must be logged in to perform this action",
      name: "UnauthorizedError",
    });
  }else{
    next();
  }
}

module.exports = {
  requireUser,
};
