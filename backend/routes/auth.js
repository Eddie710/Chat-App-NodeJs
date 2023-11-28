const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/User");

router.route("/register").post(async (req, res, next) =>{
    req.body.password = await bcrypt.hash(req.body.password, 10);

    console.log(req.body)

    await userSchema
    .create(req.body)
    .then((newUser) =>{
        const payload = { userId: newUser._id, username: newUser.username };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token,{
            withCredentials: true,
            httpOnly:false,
        });

        res.json({
            user:newUser,
        });
    })
    .catch((error)=>{
        res.json({
            error: error.message
        })
        return next(error.message);
    });
    // res.send("register")
});

router.route("/login").post(async(req,res,next) =>{
    const { username, password } = req.body;

    await userSchema
    .findOne({ username: username})
    .then((user) =>{
        if (!user) {
            return res
            .status(401)
            .json({message: "Incorrect Username or Password"})
        }

        const passwordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordCorrect) {
            return res
            .status(401)
            .json({ message: "Incorrect username or password"});
        }

        const payload = { userID: user._id, username: user.username};

        let token = jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.json({ user });
    })
    .catch(err => {
        res.json({
          Error: err
        })
        console.log(`login Error`)
        return next(err.message)
      })
    // res.send('login')
  })
  
  router.post('/logout', async (req, res, next) => {
    res.send('logout')
  })
  
  
  
  module.exports = router