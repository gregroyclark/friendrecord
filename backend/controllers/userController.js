const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* 

  ==========================================

  Handles incoming HTTP requests
  Calls corresponding functions in the model

  ==========================================

*/

const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await db.createUser(req.body.email, hashedPassword, 'user');
  res.status(201).send(user);
};

const login = async (req, res) => {
  const user = await db.findUserByEmail(req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).send(user);
  } else {
    res.status(401).send('Invalid username or password');
  }
};

module.exports = { register, login };
