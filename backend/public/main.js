require("dotenv").config();
require("../config/db.js");
const authRouter = require("../routes/authRoutes.js");
const otpRouter = require("../routes/otpRoutes.js");
const express = require("express");
const cors = require("cors");
const verifyToken = require("../middlewares/verifyToken.js");
const folderRouter = require("../routes/folderRoutes.js")
const fileRouter = require("../routes/fileRoutes.js");
const path = require("path");
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.send("App is running...");
});

app.use("/api/v1/auth", authRouter);

app.use(verifyToken);

app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/folder",folderRouter);

app.listen(process.env.PORT, () => {
    console.log("------------- App listening on port " + process.env.PORT + " ------------");
});
 