const db = require("../connection");
const DonateItemDto = require("../models/donate-item-dto");
const DonateItem = require("../models/donate-item");

const create = async (req, res, next) => {
  try {
    const data = req.body;

    var diNew = new DonateItemDto(
      data.name,
      data.p_phone_number,
      data.s_phone_number,
      data.email,
      data.description,
      data.location,
      "pending",
      data.remark
    );

    var insertData = `INSERT INTO donate_items (name,p_phone_number,s_phone_number,
        email,description,location,status,remark
        ) values('${diNew.name}','${diNew.primaryPhoneNumber}','${diNew.secondaryPhoneNumber}',
        '${diNew.email}','${diNew.description}','${diNew.location}','${diNew.status}','${diNew.remark}')`;

    db.query(insertData, (err, result) => {
      if (err) {
        res.status(500);
        throw err;
      }
      var pbSaved = new DonateItem(
        result.insertId,
        diNew.name,
        diNew.primaryPhoneNumber,
        diNew.secondaryPhoneNumber,
        diNew.email,
        diNew.description,
        diNew.location,
        diNew.status,
        diNew.remark
      );
      res
        .status(200)
        .send({ message: "Successfully uploaded!", data: pbSaved });
    });
    // }
  } catch (er) {
    res.send(er);
  }
};

const getSingleData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = `select * from donate_items where id=${id}`;
    db.query(query, (err, result) => {
      try {
        if (err) res.send(err);
        const ele = Object.values(JSON.parse(JSON.stringify(result)));

        var temp = {
          id: ele[0].id,
          name: ele[0].name,
          primaryPhoneNumber: ele[0].p_phone_number,
          secondaryPhoneNumber: ele[0].s_phone_number,
          email: ele[0].email,
          description: ele[0].description,
          location: ele[0].location,
          status: ele[0].location,
          remark: ele[0].remark,
        };
        res.status(200).send(temp);
      } catch {
        res.send([]);
      }
    });
  } catch (er) {
    res.send(er);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = `delete from donate_items where id=${id}`;

    db.query(query, (err, result) => {
      try {
        if (err) res.sendStatus(401).send(err);
        res.status(200).send({ message: "successfully deleted", data: result });
      } catch {
        res.send([]);
      }
    });
    res.status(200).send(result);
    // });
  } catch (er) {
    res.send(er);
  }
};

const getAll = async (req, res, next) => {
  try {
    const query = `select * from donate_items`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      console.log("results : ", results);
      var temp = [];
      results.forEach((ele) => {
        var add = {
          id: ele.id,
          name: ele.name,
          primaryPhoneNumber: ele.p_phone_number,
          secondaryPhoneNumber: ele.s_phone_number,
          email: ele.email,
          description: ele.description,
          location: ele.location,
          status: ele.location,
          remark: ele.remark,
        };
        temp.push(add);
      });
      res.status(200).send(temp);
    });
  } catch (er) {
    res.send(er);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = req.body;

    var diNew = new DonateItem(
      id,
      data.name,
      data.p_phone_number,
      data.s_phone_number,
      data.email,
      data.description,
      data.location,
      data.remark
    );

    console.log("diNew : ", diNew);
    // var insertData = `INSERT INTO donate_items (name,p_phone_number,s_phone_number,
    //   email,description,location,status,remark
    //   ) values('${diNew.name}','${diNew.primaryPhoneNumber}','${diNew.secondaryPhoneNumber}',
    //   '${diNew.email}','${diNew.description}','${diNew.location}','${diNew.status}','${diNew.remark}')`;

    const query = `UPDATE donate_items SET
    name= '${diNew.name}',p_phone_number = '${diNew.primaryPhoneNumber}',
    s_phone_number = '${diNew.secondaryPhoneNumber}', email = '${diNew.email}',
    description = '${diNew.description}',location = '${diNew.location}',
    remark = '${diNew.remark}'
    where id=${id}`;

    db.query(query, (err, result) => {
      try {
        if (err) res.send(err);

        res.status(201).send({
          message: "successfully updated",
          data: diNew,
        });
      } catch {
        res.send({ message: "Invalid ID" });
      }
    });
  } catch (er) {
    res.send(er);
  }
};

module.exports = {
  create,
  getSingleData,
  getAll,
  deleteItem,
  update,
};
