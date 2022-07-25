const db = require("../connection");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
let refreshTokenList = [];

const getUsers = async (req, res, next) => {
  const query = `select * from users`;
  db.query(query, (err, result) => {
    if (err) res.send(err);

    res.status(200).send(result);
  });

  // res.json(users.filter((user) => user.name === req.user.name));
};

const addUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User(
      req.body.name,
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.role
    );

    const query = `INSERT INTO users (full_name,user_name,email,password,role_id) VALUES('${user.fullName}','${user.userName}','${user.email}','${user.password}','${user.role}')`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      var id = "";
      try {
        id = result.insertId;
      } catch (er) {
        id = "";
      }
      res.status(201).send({
        message: "successfully created",
        data: {
          id: id,
          name: user.fullName,
          username: user.userName,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (er) {
    res.status(500).send(er);
  }
};

const allUsers = async () => {
  return new Promise((resolve, reject) => {
    const query = `select * from users`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const login = async (req, res, next) => {
  try {
    const rows = await allUsers();
    // if (users === -1) res.status(500).send({ message: "error" });
    var resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
    const user = resultArray.find(
      (user) => user.user_name === req.body.username
    );
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        // res.send("Success");
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokenList.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.send("incorrect password");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || token == undefined) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

const refreshToken = async (req, res, next) => {
  const token = req.body.token;

  if (token == null || token == undefined) return res.sendStatus(401);
  if (!refreshTokenList.includes(token)) return res.sendStatus(403);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

const logout = async (req, res, next) => {
  refreshTokenList = refreshTokenList.filter(
    (token) => token !== req.body.token
  );
  res.sendStatus(204);
};

module.exports = {
  getUsers,
  login,
  authenticateToken,
  refreshToken,
  logout,
  addUser,
};
