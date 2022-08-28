const multer = require("multer");
const path = require("path");
const db = require("../connection");
const VideoBased = require("../models/video-based");
const VideoBasedDto = require("../models/video-based-dto");
var fs = require("fs");
const fsPromises = require("fs/promises");

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log("No file upload");
      res.status(401).send("No file to upload");
    } else {
      const data = req.body;
      var imgsrc =
        "https://bilal-backend.skylinkict.com/videos/" + req.file.filename;
      var pbNew = new VideoBasedDto(data.name, data.description, imgsrc);

      if (pbNew.name === null && pbNew.name === undefined) {
        res.status(401).send({ message: "invalid name field" });
      } else if (
        pbNew.description === null &&
        pbNew.description === undefined
      ) {
        res.status(401).send({ message: "invalid description field" });
      } else if (pbNew.video === null && pbNew.video === undefined) {
        res.status(401).send({ message: "invalid video field" });
      }

      console.log("data : ", pbNew);
      pbNew.category = parseInt(pbNew.category);
      // if (data.name == null || data.c)
      var insertData = `INSERT INTO video_based (name,description,video_url) values('${pbNew.name}', '${pbNew.description}','${pbNew.video}')`;
      db.query(insertData, (err, result) => {
        if (err) {
          res.status(500).send(err);
          throw err;
        }
        console.log("result : ", result);
        var pbSaved = new VideoBased(
          result.insertId,
          pbNew.name,
          pbNew.description,
          pbNew.video
        );
        res
          .status(200)
          .send({ message: "Video Successfully uploaded!", data: pbSaved });
      });
    }
  } catch (er) {
    res.send(er);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    console.log("req");
    callBack(null, "./public/videos/"); // './public/images/' directory name where save the file
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

const getAll = async (req, res, next) => {
  try {
    const query = `select * from video_based`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const getSingleData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = `select * from video_based where id=${id}`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      res.status(200).send(result);
    });
  } catch (er) {
    res.send(er);
  }
};

const deleteVideoBased = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = `delete from video_based where id=${id}`;

    const queryGet = `select * from video_based where id=${id}`;
    // db.query(queryGet, async (err, result) => {
    //   if (err) res.send(err);
    //   const temp = Object.values(JSON.parse(JSON.stringify(result)))[0]
    //     .video_url;
    //   var temp1 = "" + temp;
    //   temp1 = temp1.substring(22, temp1.length);
    //   try {
    //     await removeFile(temp1);
    //   } catch {}

    db.query(query, (err, result) => {
      console.log("result : ", result);
      if (err) res.sendStatus(401).send(err);
      res.status(200).send({ message: "successfully deleted", data: result });
    });
    //   res.status(200).send(result);
    // });
  } catch (er) {
    res.send(er);
  }
};

const deleteFile = async (filePath) => {
  try {
    await fsPromises.unlink(filePath);
    console.log("Successfully removed file!");
  } catch (err) {
    console.log(err);
  }
};

const removeFile = async (fileName) => {
  const filePath = "./public/videos/" + fileName;
  var res = await deleteFile(filePath);
};
module.exports = {
  create,
  upload,
  getAll,
  getSingleData,
  deleteVideoBased,
};
