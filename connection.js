let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "skylinkictcom_bilalhabeshiuser",
  password: "jA5bzRsUI(^m",
  database: "skylinkictcom_bilal-habeshi",
});

connection.connect(function (err) {
  if (err) {
    return console.error("mysql connection error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});


module.exports = connection;