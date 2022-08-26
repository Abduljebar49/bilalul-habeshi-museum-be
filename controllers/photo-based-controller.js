const multer = require("multer");
const path = require("path");
const db = require("../connection");
const PhotoBasedWithOutImageDto = require("../models/pb-dto-without-image");
const PhotoBased = require("../models/photo-based");
const PhotoBasedDto = require("../models/photo-based-dto");
const fsPromises = require("fs/promises");


const create = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log("No file upload");
      res.status(401).send("No file to upload");
    } else {
      const data = req.body;
      var imgsrc =
        "https://bilal-backend.skylinkict.com/images/" + req.file.filename;
      var pbNew = new PhotoBasedDto(
        data.name,
        data.description,
        data.category,
        imgsrc,
        data.code
      );

      if (pbNew.name === null && pbNew.name === undefined) {
        res.status(401).send({ message: "invalid name field" });
      } else if (
        pbNew.description === null &&
        pbNew.description === undefined
      ) {
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
  } catch (er) {
    res.send(er);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;

    var pbNew = new PhotoBasedWithOutImageDto(
      data.name,
      data.description,
      data.category,
      data.code
    );
    if (pbNew.name === null && pbNew.name === undefined) {
      res.status(401).send({ message: "invalid name field" });
    } else if (pbNew.description === null && pbNew.description === undefined) {
      res.status(401).send({ message: "invalid description field" });
    } else if (pbNew.category === null && pbNew.category === undefined) {
      res.status(401).send({ message: "invalid category field" });
    } else if (pbNew.code === null && pbNew.code === undefined) {
      res.status(401).send({ message: "invalid code field" });
    }
    var updateData = `UPDATE photo_based SET name = '${pbNew.name}',
                                description = '${pbNew.description}',
                                category = '${pbNew.category}',
                                code = '${pbNew.code}'
                                WHERE id=${id}
                    `;
    db.query(updateData, (err, result) => {
      if (err) {
        res.status(500);
        throw err;
      }
      res.status(200).send({ message: "Successfully updated!", data: pbNew });
    });
  } catch (er) {
    res.sendStatus(500).send(er);
  }
};

const updateWithImage = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;

    if (!req.file) {
      console.log("No file upload");
      res.status(401).send("No file to upload");
    } else {
      const data = req.body;
      var imgsrc =
        "https://bilal-backend.skylinkict.com/images/" + req.file.filename;
      var pbNew = new PhotoBasedDto(
        data.name,
        data.description,
        data.category,
        imgsrc,
        data.code
      );

      if (pbNew.name === null && pbNew.name === undefined) {
        res.status(401).send({ message: "invalid name field" });
      } else if (
        pbNew.description === null &&
        pbNew.description === undefined
      ) {
        res.status(401).send({ message: "invalid description field" });
      } else if (pbNew.category === null && pbNew.category === undefined) {
        res.status(401).send({ message: "invalid category field" });
      } else if (pbNew.photo === null && pbNew.photo === undefined) {
        res.status(401).send({ message: "invalid photo field" });
      } else if (pbNew.code === null && pbNew.code === undefined) {
        res.status(401).send({ message: "invalid code field" });
      }

      // var pbNew = new PhotoBasedWithOutImageDto(
      //   data.name,
      //   data.description,
      //   data.category,
      //   data.code
      // );
      var updateData = `UPDATE photo_based SET name = '${pbNew.name}',
                                description = '${pbNew.description}',
                                category = '${pbNew.category}',
                                code = '${pbNew.code}',
                                photo_url = '${pbNew.photo}'
                                WHERE id=${id}
                    `;
      db.query(updateData, (err, result) => {
        if (err) {
          res.status(500);
          throw err;
        }
        res.status(200).send({ message: "Successfully updated!", data: pbNew });
      });
    }
  } catch (er) {
    res.sendStatus(500).send(er);
  }
};

const getSingleData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = `select * from photo_based where id=${id}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const deletePhotoBased = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = `delete from photo_based where id=${id}`;

    const queryGet = `select * from photo_based where id=${id}`;
    db.query(queryGet, async (err, result) => {
      if (err) res.send(err);
      const temp = Object.values(JSON.parse(JSON.stringify(result)))[0]
        .video_url;
      var temp1 = "" + temp;
      temp1 = temp1.substring(22, temp1.length);
      try {
        await removeFile(temp1);
      } catch {}
      
      db.query(query, (err, result) => {
        console.log("result : ", result);
        if (err) res.sendStatus(401).send(err);
        res.status(200).send({ message: "successfully deleted", data: result });
      });
      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }

  // try {
  //   const id = req.params.id;
  //   const query = `delete from photo_based where id=${id}`;
  //   db.query(query, (err, result) => {
  //     console.log("result : ", result);
  //     if (err) res.sendStatus(401).send(err);
  //     res.status(200).send({ message: "successfully deleted", data: result });
  //   });
  // } catch (er) {
  //   res.send(er);
  // }
};

const getAll = async (req, res, next) => {
  try {
    const query = `select * from photo_based`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
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


const deleteFile = async (filePath) => {
  try {
    await fsPromises.unlink(filePath);
    console.log("Successfully removed file!");
  } catch (err) {
    console.log(err);
  }
};

const removeFile = async (fileName) => {
  const filePath = "./public/images/" + fileName;
  var res = await deleteFile(filePath);
};
module.exports = {
  create,
  upload,
  getSingleData,
  getAll,
  deletePhotoBased,
  update,
  updateWithImage
};
