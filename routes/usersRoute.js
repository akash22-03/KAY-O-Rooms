const express = require("express");
const router = express.Router();
const User = require('../models/user')

router.post('/register', async (req, res) => {

  const newuser = new User(req.body)

  try {
    const user = await newuser.save()
    res.send('User Registered Successfully')
  } catch (error) {
    return res.status(400).json({ error });
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email, password: password })
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._is,
      }
      res.send(temp)
    }
    else {
      return res.status(400).json({ message: 'Login Failed' })
    }
  } catch (error) {
    return res.status(400).json({ error })
  };
});

module.exports = router