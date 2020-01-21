const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validate = user => {
  if (!user.name || !user.password || !user.email) return false;
};

exports.singup = (req, res) => {
  // validate
  console.log(req.body);
  if (validate(req.body))
    return res
      .json(401)
      .json({ message: "Not valid request, check input fields" });

  User.find({ email: req.body.email }).then(user => {
    if (user.length > 0)
      return res.status(409).json({ message: "User already exists" });

    if (req.body.password !== req.body.password_confirmation)
      return res
        .status(401)
        .json({ message: "Password and confirm password do not match" });
    // return res.status(403).json({ message: "Password and confirm password do not match"})

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        console.log("ERROR", err);
        return res.status(500).json({ error: err });
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
        .then(newUser => {
          const token = jwt.sign(
            {
              userId: newUser._id,
              name: newUser.name,
              email: newUser.email
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );

          res.status(201).json({
            message: "Created new user successfully",
            token,
            newUser
          });
        })
        .catch(err => {
          console.log("ERROR", err);
          res.status(500).json({ error: err });
        });
    });
    // .catch(err => {
    //   res.status(500).json({ error: err });
    // });
  });
};

exports.login = (req, res) => {
  User.find({ email: req.body.email }).then(user => {
    if (user.length < 1) res.status(401).json({ message: "Auth failed 1" });
    bcrypt.compare(
      req.body.password,
      user[0].password,
      (err, isPasswordCorrect) => {
        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              name: user[0].name,
              email: user[0].email
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth succeed",
            token
          });
        }
        res.status(401).json({ message: "Auth failed 2" });
      }
    );
  });
};

exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .then(result => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
