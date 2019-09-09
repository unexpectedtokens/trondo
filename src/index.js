const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRoute = require("./routers/user");
const taskRoute = require("./routers/task");
const projectRoute = require("./routers/dtask");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const schedule = require("node-schedule");
const dTask = require("./models/Dtask");
require("./db/mongoose");
schedule.scheduleJob("0 0 * * *", () => {
  dTask.updateMany(
    { completed: true },
    { $set: { completed: false } },
    { multi: true },
    (err, writeResult) => {
      if (err) {
        return console.log(err);
      }
      console.log(
        "Successfully uncompleted all daily tasks. Result:",
        writeResult
      );
    }
  );
});
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
