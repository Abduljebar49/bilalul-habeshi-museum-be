const db = require("../connection");
const VisitorDto = require("../models/visitor-dto");
const Visitor = require("../models/visitor");
const create = async (req, res, next) => {
  try {
    const data = req.body;

    var diNew = new VisitorDto(
      data.name,
      data.phone_number,
      data.no_of_visitor,
      data.visit_date,
      data.visit_time,
      "pending",
      data.remark
    );

    // pbNew.category = parseInt(pbNew.category);

    var insertData = `INSERT INTO visitors (name,
      phone_number,
      visitor_number,
      visit_date,
      visit_time,
        status,remark
        ) values('${diNew.name}','${diNew.phoneNumber}','${diNew.noOfVisitor}',
        '${diNew.visitDate}','${diNew.visitTime}','${diNew.status}','${diNew.remark}')`;

    db.query(insertData, (err, result) => {
      if (err) {
        res.status(500);
        throw err;
      }
      var pbSaved = new Visitor(
        result.insertId,
        diNew.name,
        diNew.phoneNumber,
        diNew.noOfVisitor,
        diNew.visitDate,
        diNew.visitTime,
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
    const query = `select * from visitors where id=${id}`;
    db.query(query, (err, result) => {
      try {
        if (err) res.send(err);
        const ele = Object.values(JSON.parse(JSON.stringify(result)));

        var temp = {
          id: ele[0].id,
          name: ele[0].name,
          PhoneNumber: ele[0].phone_number,
          noOfVisitor: ele[0].visitor_number,
          visitDate: ele[0].visit_date,
          visitTime: ele[0].visit_time,
          status: ele[0].status,
          remark: ele[0].remark,
        };
        res.status(200).send(temp);
      } catch (er) {
        res.send(er);
      }
    });
  } catch (er) {
    res.send(er);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = `delete from visitors where id=${id}`;

    db.query(query, (err, result) => {
      // console.log("result : ", result);
      if (err) res.sendStatus(401).send(err);
      res.status(200).send({ message: "successfully deleted", data: result });
    });
    res.status(200).send({ message: "successfully deleted", data: result });
    // res.status(200).send(result);
    // });
  } catch (er) {
    res.send(er);
  }
};

const getAll = async (req, res, next) => {
  try {
    const query = `select * from visitors where status='pending'`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      console.log("results : ", results);
      var temp = [];
      results.forEach((ele) => {
        var add = {
          id: ele.id,
          name: ele.name,
          PhoneNumber: ele.phone_number,
          noOfVisitor: ele.visitor_number,
          visitDate: ele.visit_date,
          visitTime: ele.visit_time,
          status: ele.status,
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


const getAllApproved = async (req, res, next) => {
  try {
    const query = `select * from visitors where status='approved'`;
    db.query(query, (err, result) => {
      if (err) res.send(err);
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      console.log("results : ", results);
      var temp = [];
      results.forEach((ele) => {
        var add = {
          id: ele.id,
          name: ele.name,
          PhoneNumber: ele.phone_number,
          noOfVisitor: ele.visitor_number,
          visitDate: ele.visit_date,
          visitTime: ele.visit_time,
          status: ele.status,
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

    var diNew = new Visitor(
      id,
      data.name,
      data.phone_number,
      data.no_of_visitor,
      data.visit_date,
      data.visit_time,
      "status",
      data.remark
    );

    console.log("diNew : ", diNew);
    // var insertData = `INSERT INTO donate_items (name,p_phone_number,s_phone_number,
    //   email,description,location,status,remark
    //   ) values('${diNew.name}','${diNew.primaryPhoneNumber}','${diNew.secondaryPhoneNumber}',
    //   '${diNew.email}','${diNew.description}','${diNew.location}','${diNew.status}','${diNew.remark}')`;

    const query = `UPDATE visitors SET
    name= '${diNew.name}',phone_number = '${diNew.phoneNumber}',
    visitor_number = '${diNew.noOfVisitor}', visit_date = '${diNew.visitDate}',
    visit_time = '${diNew.visitTime}',
    remark = '${diNew.remark}'
    where id=${id}`;

    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(201).send({
        message: "successfully updated",
        data: diNew,
      });
    });
  } catch (er) {
    res.send(er);
  }
};

const updateStatus = async (req, res, next) => {
  const id = req.params.id;

  var query = `UPDATE visitors SET status='approved' where id = ${id}`;
  try {
    db.query(query, (err, result) => {
      if (err) res.send(err);

      res.status(201).send({
        message: "successfully approved",
      });
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
  updateStatus,
  getAllApproved
};
