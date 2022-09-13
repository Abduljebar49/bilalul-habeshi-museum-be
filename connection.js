let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "bilalulhabeshico_bilalul-habeshi-user",
  password: "!OWfYpOOZSWA",
  database: "bilalulhabeshico_bilalhabeshi",});

connection.connect(function (err) {
  if (err) {
    return console.error("mysql connection error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});


module.exports = connection;