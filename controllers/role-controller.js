const db = require("../connection");

const getAllUserRoles = async (req, res, next) => {
  try {
    const query = `select * from user_roles`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const getUserRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = `select * from user_roles where id=${id}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const addRole = async (req, res, next) => {
  try {
    const name = req.body.name;
    const query = `INSERT INTO user_roles (name) VALUES('${name}')`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(201).send({
        message: "successfully created",
        data: {
          id: result.insertId,
          name: name,
        },
      });
    });
  } catch (er) {
    res.send(er);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = `delete from user_roles where id=${id}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(201).send({
        message: "successfully deleted",
        data: {
          id: result.insertId,
          name: name,
        },
      });
    });
  } catch (er) {
    res.send(er);
  }
};

module.exports = {
  getAllUserRoles,
  getUserRole,
  addRole,
  deleteRole,
};
