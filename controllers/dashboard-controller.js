const database = require("../classes/database");
const db = require("../connection");


const getDashboardCount = (req,res,next) =>{
    const datab = new database();
    // const id = req.params.id;
    const query_pb = `SELECT count(*) as numRows FROM photo_based`;
    const query_ca = `SELECT count(*) as numRows FROM category`;
    const query_vb = `SELECT count(*) as numRows FROM video_based`;
    const query_vs = `SELECT count(*) as numRows FROM visitors`;
    const query_dn = `SELECT count(*) as numRows FROM donate_items`;
  var result = [];
    datab
    .query(query_pb)
    .then(function (results) {
        var numRows = results[0].numRows;
        result.push({
            name:'photo based collections',
            count:numRows,
        })
    })
    .then(()=>datab.query(query_vb))
    .then(function(results){
        var numRows = results[0].numRows;
        result.push({
            name:'video based collections',
            count:numRows,
        })
    })
    .then(()=>datab.query(query_ca))
    .then(function(results){
        var numRows = results[0].numRows;
        result.push({
            name:'number of category',
            count:numRows,
        })
    })
    .then(()=>datab.query(query_vs))
    .then(function(results){
        var numRows = results[0].numRows;
        result.push({
            name:'number of visitors appleid so far',
            count:numRows,
        })
    })
    .then(()=>datab.query(query_dn))
    .then(function(results){
        var numRows = results[0].numRows;
        result.push({
            name:'number of equipment donators appleid so far',
            count:numRows,
        })
        res.send(result);
    })

    ;
}

module.exports = {
    getDashboardCount
}