const multer = require("multer");
const path = require("path");
const db = require("../connection");
const PhotoBased = require("../models/photo-based");
const PhotoBasedDto = require("../models/photo-based-dto");

const create = async (req, res, next) => {
  if (!req.file) {
    console.log("No file upload");
    res.status(401).send("No file to upload");
  } else {
    const data = req.body;
    var imgsrc = "http://127.0.0.1:3000/images/" + req.file.filename;
    var pbNew = new PhotoBasedDto(
      data.name,
      data.description,
      data.category,
      imgsrc,
      data.code
    );

    if (pbNew.name === null && pbNew.name === undefined) {
      res.status(401).send({ message: "invalid name field" });
    } else if (pbNew.description === null && pbNew.description === undefined) {
      res.status(401).send({ message: "invalid description field" });
    } else if (pbNew.category === null && pbNew.category === undefined) {
      res.status(401).send({ message: "invalid category field" });
    } else if (pbNew.photo === null && pbNew.photo === undefined) {
      res.status(401).send({ message: "invalid photo field" });
    } else if (pbNew.code === null && pbNew.code === undefined) {
      res.status(401).send({ message: "invalid code field" });
    }

    console.log("data : ", pbNew);
    pbNew.category = parseInt(pbNew.category);
    // if (data.name == null || data.c)
    var insertData = `INSERT INTO photo_based (name,description,category,code,photo_url) values('${pbNew.name}', '${pbNew.description}',${pbNew.category},'${pbNew.code}','${pbNew.photo}')`;
    db.query(insertData, (err, result) => {
      if (err) {
        res.status(500);
        throw err;
      }
      console.log("result : ", result);
      var pbSaved = new PhotoBased(
        result.insertId,
        pbNew.name,
        pbNew.description,
        pbNew.category,
        pbNew.photo,
        pbNew.code
      );
      res
        .status(200)
        .send({ message: "Successfully uploaded!", data: pbSaved });
    });
  }
};

const getSingleData = async (req, res, next) => {
  const id = req.params.id;

  const query = `select * from photo_based where id=${id}`;
  db.query(query, (err, result) => {
    if (err) res.send(err);

    res.status(200).send(result);
  });
};

const getAll = async (req, res, next) => {
  const query = `select * from photo_based`;
  db.query(query, (err, result) => {
    if (err) res.send(err);
    res.status(200).send(result);
  });
};

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    console.log("req");
    callBack(null, "./public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

module.exports = {
  create,
  upload,
  getSingleData,
  getAll,
};
