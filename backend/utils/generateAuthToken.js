const jwt = require("jsonwebtoken")

const generateAuthToken = (_id, name, email, phone) => {
  return jwt.sign(
    { _id, name, email, phone },
    process.env.JWT_SECRET,
    { expiresIn: "7h" }
  );
};
module.exports = generateAuthToken