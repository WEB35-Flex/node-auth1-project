module.exports = authenticateUser;

function authenticateUser(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 2) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
}
