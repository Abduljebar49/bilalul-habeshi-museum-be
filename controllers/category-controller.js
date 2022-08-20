const db = require("../connection");

const getAllCategory = async (req, res, next) => {
  try {
    const query = `select * from category`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = `select * from category where id=${id}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const addCategory = async (req, res, next) => {
  try {
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
  } catch (er) {
    res.send(er);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const name = req.body.name;
    const id = req.params.id;

    const query = `UPDATE category SET name='${name}' where id=${id}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(201).send({
        message: "successfully updated",
        data: {
          id: id,
          name: name,
        },
      });
    });
  } catch (er) {
    res.send(er);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
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
  } catch (er) {
    res.send(er);
  }
};

module.exports = {
  getAllCategory,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory
};
