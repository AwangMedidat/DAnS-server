const axios = require("axios");
const bcrypt = require("bcrypt");
const salt = 10;
const db = require("../db/connection");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const sql = "SELECT * FROM user WHERE username = ?";

  try {
    const [rows] = await db.query(sql, [req.body.username]);

    if (rows.length > 0) {
      const passwordMatch = await bcrypt.compare(
        req.body.password.toString(),
        rows[0].password
      );

      if (passwordMatch) {
        const { id, username } = rows[0];
        const token = jwt.sign({ id, username }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });

        return res.json({ Status: "Success", data: { id, username, token } });
      } else {
        return res.json({ Status: "Error", data: "Password not matched" });
      }
    } else {
      return res.json({ Status: "Error", data: "No username exists" });
    }
  } catch (err) {
    return res.json({ Status: "Error", data: "Login Error in server" });
  }
};

exports.register = async (req, res, next) => {
  const sql = "INSERT INTO user (`email`,`password`,`username`) VALUES (?)";

  try {
    const hash = await bcrypt.hash(req.body.password.toString(), salt);
    const values = [req.body.email, hash, req.body.username];

    const result = await db.query(sql, [values]);

    const insertedData = result[0];

    return res.json({ Status: "Success", data: insertedData });
  } catch (err) {
    return res.json({
      Status: "Error",
      data: "Error for hashing password or inserting data in the server",
    });
  }
};
