const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (
    (req.path === "/users/login" || req.path === "/users") &&
    req.method == "POST"
  )
    return next();

  if (req.headers.authorization) {
    const tokenVerified = jwt.verify(
      req.headers.authorization,
      "accessTokenSecret"
    );
    if (tokenVerified) {
      res.locals.user = tokenVerified.sub;
      return next();
    }
  }

  res.sendStatus(401);
};

module.exports = {
  verifyToken,
};
