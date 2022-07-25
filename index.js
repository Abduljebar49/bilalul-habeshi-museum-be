const express = require("express");
const bodyparser = require("body-parser");
const userRoute = require("./routes/user-route");
const roleRoute = require("./routes/role-route");
const categoryRoute = require("./routes/category-route");
const photoBasedRoute = require("./routes/photo-based-route");
const app = express();
const db = require("./connection");

app.use(express.static("./public"));
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/api", userRoute.routes);
app.use("/api", roleRoute.routes);
app.use("/api", photoBasedRoute.routes);
app.use("/api", categoryRoute.routes);
app.use("/api", categoryRoute.routes);
// app.post("/post", upload.single("image"), (req, res) => {

// });

app.listen(3000, function () {
  console.log("listening on port 3000 ");
});
