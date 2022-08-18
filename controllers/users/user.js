const model = require("../../models/index");
const jwt = require("jsonwebtoken");
const user = require("../../models/user");
const env = require("dotenv").config();

const bcrypt = require("bcrypt");

const controllerUser = {};

controllerUser.singUp = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      adderess,
      city,
      country,
      name,
      postcode,
    } = req.body;

    let checkEmail = await model.User.findOne({ where: { email: email } });

    if (
      email !== password &&
      password.length > 8
    ) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      if (!checkEmail) {
        let register = await model.User.create({
            username:username,
            email:email,
            password:passwordHash,
            phone:phone,
            adderess:adderess,
            city:city,
            country:country,
            name:name,
            postcode:postcode,
        });
        res.status(200).json({
          message: "successfully registered",
          data: [register],
        });
      } else {
        res.status(400).json({
          message: "your email is already registered",
        });
      }
    } else {
      res.status(400).json({
        message: "invalid password or email does not match",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "internal Server Error" });
  }
};

controllerUser.singIn = async (req, res) => {
  try {
    const body = req.body;

    const user = await model.User.findAll({ where: { email: body.email } });
    const comparePassword = await bcrypt.compare(
      body.password,
      user[0].password
    );
    if (!comparePassword) {
      return res.status(400).json({ message: "your password doesn't match" });
    } else {
      const email = user[0].email;
      const username = user[0].username;

      const token = jwt.sign({email}, process.env.TOKEN, {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      const user = {
        email: email,
        token: token,
        username: username,
      };

      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: `internal Server Error ${error}` });
  }
};

module.exports = controllerUser;
