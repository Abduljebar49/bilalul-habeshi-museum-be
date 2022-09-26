const db = require("../connection");
const TABLE_NAME = "comments";
const Comment = require("../models/comment");
const CommentDto = require("../models/comment-dto");


const getComments = async (req, res, next) => {
  try {
    const query = `select * from ${TABLE_NAME}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const getComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = `select * from ${TABLE_NAME} where id=${id}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const addComment = async (req, res, next) => {
  try {
    
    var comment = new CommentDto(
        req.body.name,
        req.body.email,
        req.body.detail,
        req.body.item
    );

    const query = `INSERT INTO ${TABLE_NAME} (name,email,detail,item_id) VALUES('${comment.name}','${comment.email}','${comment.detail}','${comment.item}')`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(201).send({
        message: "successfully created",
        data: {
          id: result.insertId,
          name:comment.name,
          email: comment.email,
          detail:comment.detail,
          item:comment.item          
        },
      });
    });
  } catch (er) {
    res.send(er);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = `delete from ${TABLE_NAME} where id=${id}`;
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
    getComments,
    getComment,
    addComment,
    deleteComment
};
