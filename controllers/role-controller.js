const db = require("../connection");

const getAllUserRoles = async (req, res, next) => {
  const query = `select * from user_roles`;
  db.query(query, (err, result) => {
    if (err) res.send(err);
    res.status(200).send(result);
  });
};

const getUserRole = async (req, res, next) => {
  const id = req.params.id;

  const query = `select * from user_roles where id=${id}`;
  db.query(query, (err, result) => {
    if (err) res.send(err);

    res.status(200).send(result);
  });
};

const addRole = async (req, res, next) => {
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
};

const deleteRole = async (req, res, next) => {
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
};

module.exports = {
  getAllUserRoles,
  getUserRole,
  addRole,
  deleteRole,
};
