const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use("/openai", require("./routes/openaiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, console.log(`Server started on port ${port}`));
