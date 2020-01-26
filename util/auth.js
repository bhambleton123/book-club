module.exports = (req, res, next) => {
  if (req.user) {
    req.nextParams = req.params;
    next();
  } else {
    res.status(401).send("User not logged in.");
  }
};
