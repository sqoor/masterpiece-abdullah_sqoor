const mongoose = require("mongoose");
const Joi = require('joi');

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minLength: [3, "Name is too short!"],
    maxLength: [1, "Name is too long!"]
   },
  email: { 
    type: String,
    required: true,
    unique: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 255,
    // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  }
});

const User = mongoose.model("User", userSchema);

const schema = {
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required()
};

const validate = (user) => {
  const { error, value } = Joi.validate({ a: 'a string' }, schema)
  return { error, value };
};

module.exports = User;
