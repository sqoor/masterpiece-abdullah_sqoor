const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = getToken(req);
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.userData = decoded;

    next();
  } catch (e) {
    console.log("CHECK AUTH ERROR: ", e);

    res.status(401).json({
      message: "Auth failed"
    });
  }
};

function getToken(req) {
  let headers = req.headers;
  let token;

  if (headers.authorization) {
    token = headers.authorization;
    console.log("1- FIRST TOKEN:", token);
  } else if (headers.authurization) {
    token = headers.authurization;
    console.log("2- SECOND TOKEN:", token);
  }

  return token.split(" ")[1];
}
