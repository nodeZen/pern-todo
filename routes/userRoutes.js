const express = require("express");
const router = express.Router();
const pool = require("../connections/postgre");
const {
  selectUser,
  registerUser,
  selectById,
} = require("../constants/queries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middlewares/authorize");

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const userExists = await pool.query(selectUser, [email]);
    if (userExists.rows.length) {
      return res.send({
        failMessage: require("../constants/messages").userExists,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const registeredUser = await pool.query(registerUser, [
      userName,
      email,
      bcryptPassword,
    ]);
    const token = jwtGenerator(registeredUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await pool.query(selectUser, [email]);
    if (!userExists.rows.length) {
      return res.send({
        failMessage: require("../constants/messages").incorrectCreds,
      });
    }
    const isPasswordsMatched = await bcrypt.compare(
      password,
      userExists.rows[0].password
    );
    if (!isPasswordsMatched)
      return res.send({
        failMessage: require("../constants/messages").incorrectCreds,
      });
    const token = jwtGenerator(userExists.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/user-data", authorize, async (req, res) => {
  try {
    const userData = await pool.query(selectById, [req.user]);
    res.send({
      userId: userData.rows[0].user_id,
      userName: userData.rows[0].user_name,
    });
  } catch (err) {
    res.send({ error: err });
  }
});

router.get("/is-verify", authorize, async (req, res) => {
  try {
    res.status(201).send(true);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
