async function requireUser(req, res, next) {
  // keep commented out to test API first before bringing back.

  // if (!req.user) {
  //   // console.log(req.user);
  //   res.status(403).json({
  //     error: "Not Authorized",
  //     message: "You must be logged in to perform this action",
  //     name: "UnauthorizedError",
  //   });
  // } else {
  next();
  // }
}

async function isAdmin(req, res, next) {
  const user = req.user;

  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Only admins can perform this action" });
  }
}

module.exports = {
  requireUser,
  isAdmin,
};
