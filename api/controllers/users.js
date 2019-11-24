const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.singup = (req, res) => {
  User.find({ email: req.body.email }).then(user => {
    if (user.length > 0)
      return res.status(409).json({ message: "User already exists" });

    bcrypt
      .hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) res.status(500).json({ error: err });

        User.create({
          email: req.body.email,
          password: hashedPassword
        })
          .then(newUser => {
            res.status(201).json({
              message: "Created new user successfully",
              newUser
            });
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
};

exports.login = (req, res) => {
  User.find({ email: req.body.email }).then(user => {
    if (user.length < 1) res.status(401).json({ message: "Auth failed" });

    bcrypt.compare(
      req.body.password,
      user[0].password,
      (err, isPasswordCorrect) => {
        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
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
        res.status(401).json({ message: "Auth failed" });
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
