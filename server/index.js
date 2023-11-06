const express = require("express");
const Dbconnection = require("./database/connection");
const router = require("./router/controllers");
const varifyToken = require("./authentication/varifyToken");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors())
app.use("/", router);
app.use("/authRoute", varifyToken);


app.listen(8000, () => {
    console.log("server running on 8000");
    Dbconnection;
});