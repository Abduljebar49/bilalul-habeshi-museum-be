const db = require("../connection");

const getAllCategory = async (req, res, next) => {
  const query = `select * from category`;
  db.query(query, (err, result) => {
    if (err) res.send(err);
    res.status(200).send(result);
  });
};

const getCategory = async (req, res, next) => {
  const id = req.params.id;

  const query = `select * from category where id=${id}`;
  db.query(query, (err, result) => {
    if (err) res.send(err);

    res.status(200).send(result);
  });
};

const addCategory = async (req, res, next) => {
  const name = req.body.name;
  const query = `INSERT INTO category (name) VALUES('${name}')`;
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

const deleteCategory = async (req, res, next) => {
  const id = req.params.id;

  const query = `delete from category where id=${id}`;
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
  getAllCategory,
  getCategory,
  addCategory,
  deleteCategory,
};
