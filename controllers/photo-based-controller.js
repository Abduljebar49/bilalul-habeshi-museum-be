const multer = require("multer");
const path = require("path");
const db = require("../connection");
const PhotoBasedWithOutImageDto = require("../models/pb-dto-without-image");
const PhotoBased = require("../models/photo-based");
const PhotoBasedDto = require("../models/photo-based-dto");
const fsPromises = require("fs/promises");
const database = require("../classes/database");
const TABLENAME = "photo_based";

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(401).send("No file to upload");
    } else {
      const data = req.body;
      var imgsrc =
        "https://virtual-backend.bilalulhabeshi.com/images/" +
        req.file.filename;
      var pbNew = new PhotoBasedDto(
        data.name,
        data.description,
        data.category,
        imgsrc,
        data.code,
        data.type
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
      pbNew.category = parseInt(pbNew.category);
      var insertData = `INSERT INTO ${TABLENAME} (name,description,category,code,photo_url,type) values('${pbNew.name}', '${pbNew.description}',${pbNew.category},'${pbNew.code}','${pbNew.photo}','${pbNew.type}')`;
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
          pbNew.code,
          pbNew.type
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
      data.code,
      data.type
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
                                code = '${pbNew.code}',
                                type = '${pbNew.type}'
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
        data.code,
        data.type
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
                                photo_url = '${pbNew.photo}',
                                type = '${pbNew.type}'
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

    // const queryGet = `select * from photo_based where id=${id}`;
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
      // console.log("result : ", result);
      if (err) res.sendStatus(401).send(err);
      res.status(200).send({ message: "successfully deleted", data: result });
    });
    res.status(200).send(result);
    // });
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

const getAllCategory = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const query = `select * from category`;
        db.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (er) {
        reject(er);
      }
    }, 100);
  });
};

const getFromTableNumber = (ele, number) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `select * from ${TABLENAME} where category=${ele.id} ORDER BY ID DESC LIMIT ${number}`;
      db.query(query, (err, result) => {
        if (err) reject(err);
        console.log("result : ", result);
        console.log("query : ", query);
        resolve(result);
      });
    } catch (er) {
      reject(er);
    }
  });
};

const addCount = async (req, res, next) => {
  const datab = new database();
  const id = req.params.id;
  const query = `Select count from photo_based where id=${id}`;
  var query1 = "";
  var countNum = 0;

  datab
    .query(query)
    .then(function (results) {
      countNum = results[0].count;
      countNum = countNum + 1;
      query1 = `UPDATE photo_based SET count=${countNum} where id=${id}`;
    })
    .then(() => datab.query(query1))
    .then(function (results) {
      res.send({
        count: countNum,
        id: id,
      });
    });
};

const getFromTable = async (categoryList, number) => {
  var list = [];
  return new Promise(async (resolve, reject) => {
    try {
      var index = 0;
      await categoryList.forEach(async (ele) => {
        var res = Object.values(
          JSON.parse(JSON.stringify(await getFromTableNumber(ele, number)))
        );
        list.push({
          id: ele.id,
          name: ele.name,
          data: res,
        });
        if (index == categoryList.length - 1) {
          resolve(list);
        }
        index = index + 1;
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getPaginatedList = async (req, res, next) => {
  var numRows;
  var queryPagination;
  var numPerPage = parseInt(req.query.npp, 10) || 1;
  var page = parseInt(req.query.page, 10) || 0;
  var categoryId = parseInt(req.query.category) || -1;
  var totalRows = 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + "," + numPerPage;
  const datab = new database();
  var sqlQuery = "";
  var sqlQueryNo1 = "";
  if (categoryId == -1) {
    sqlQuery = `SELECT * FROM ${TABLENAME} ORDER BY ID DESC LIMIT ${limit}`;
    sqlQueryNo1 = `SELECT count(*) as numRows FROM ${TABLENAME}`;
  } else {
    sqlQuery = `SELECT * FROM ${TABLENAME} where category=${categoryId} ORDER BY ID DESC LIMIT ${limit}`;
    sqlQueryNo1 = `SELECT count(*) as numRows FROM ${TABLENAME}  where category=${categoryId}`;
  }
  datab
    .query(sqlQueryNo1)
    .then(function (results) {
      numRows = results[0].numRows;
      totalRows = numRows;
      numPages = Math.ceil(numRows / numPerPage);
      var skip = page * numPerPage;
      console.log("page : ",page," numbPerPage: ",numPerPage," totalRows: ",totalRows," skip : ",skip);
      if (skip > numRows || skip == numRows) {
        skip = 0;
      }
      var limit = skip + "," + numPerPage;
      if (categoryId == -1) {
        sqlQuery = `SELECT * FROM ${TABLENAME} ORDER BY ID DESC LIMIT ${limit}`;
      } else {
        sqlQuery = `SELECT * FROM ${TABLENAME} where category=${categoryId} ORDER BY ID DESC LIMIT ${limit}`;
      }
      console.log("sqlQuery : ",sqlQuery);
    })
    .then(() => datab.query(sqlQuery))
    .then(function (results) {
      var responsePayload = {
        results: results,
      };
      if (page < numPages) {
        responsePayload.pagination = {
          totalItem: totalRows,
          current: page,
          perPage: numPerPage,
          previous: page > 0 ? page - 1 : undefined,
          next: page < numPages - 1 ? page + 1 : undefined,
        };
      } else
        responsePayload.pagination = {
          totalItem: totalRows,
          current: page,
          perPage: numPerPage,
        };
        
      res.json(responsePayload);
    })
    .catch(function (err) {
      console.error(err);
      res.json({ err: err });
    });
};

const getHomeCategoryList = async (req, res, next) => {
  console.log("params : ", req.params);

  var categoryList = Object.values(
    JSON.parse(JSON.stringify(await getAllCategory()))
  );
  try {
    var number = req.params.num;
    var list = await getFromTable(categoryList, number);
    res.send(list);
  } catch {
    res.sendStatus(500).send({ message: "There exist error" });
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

var searchCollection = async (req, res, next) => {
  try {
    var searchQuery = req.query.q;

    const query = `select * from photo_based where name='${searchQuery}'`;

    db.query(query, (err, result) => {
      if (err) {
        res.status(500);
        throw err;
      }
      res.send(result);
    });
  } catch (er) {
    res.sendStatus(500).send({ message: "there exists an error" });
  }
};

// const deleteFile = async (filePath) => {
//   try {
//     await fsPromises.unlink(filePath);
//     console.log("Successfully removed file!");
//   } catch (err) {
//     console.log(err);
//   }
// };

// const removeFile = async (fileName) => {
//   const filePath = "./public/images/" + fileName;
//   var res = await deleteFile(filePath);
// };
module.exports = {
  create,
  upload,
  getSingleData,
  getAll,
  deletePhotoBased,
  update,
  updateWithImage,
  getHomeCategoryList,
  getPaginatedList,
  searchCollection,
  addCount,
};
