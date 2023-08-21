const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const socketModule = require("./utils/Socket");
const path = require("path");
const dotenv = require("dotenv");

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

connectDB();

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

//Admin
app.use("/api/auth", require("./routes/adminRoute"));
//Invited User
app.use("/api/auth", require("./routes/inviteRoute"));
//Business Plan
app.use("/api/auth", require("./routes/businessPlanRoute"));

if (process.env.NODE_ENV === "dev") { //replaced "production" with "dev"
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
// socketModule.init(server);
