const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/authroutes");
const Bookrouter = require("./routes/bookroutes");
const Memberrouter = require("./routes/memberroute");
const Reportsrouter = require("./routes/reports");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", router);
app.use("/api", Bookrouter);
app.use("/api/borrow", Memberrouter);
app.use("/api/reports", Reportsrouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DataBase Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server Was Running");
    });
  })
  .catch((err) => console.log(err));
