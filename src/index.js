const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRoute = require("./routers/user");
const taskRoute = require("./routers/task");
const projectRoute = require("./routers/project");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("./db/mongoose");
app.use(express.static(path.resolve(__dirname, "../trondo/dist")));
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(userRoute);
app.use(taskRoute);
app.use(projectRoute);
app.get("/app", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../trondo/dist/index.html"));
});

app.listen(port, () => {
  console.log(`server is up in ${port}`);
});
