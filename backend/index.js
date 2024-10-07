const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/TaskRoute");
const dbConn = require("./utils/db");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use("/api/tasks/", router);

app.get("/", (req, res) => {
    res.status(200).send("My Backend Server is Successfully Working.........");
})

const port = process.env.PORT || 3000;

dbConn().then(()=>{
    app.listen(port, ()=> {
        console.log(`Welcome Mr Kartik Barman\nYour Server is running port on http://localhost:${port}`);
    })
})



