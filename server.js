const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const config = require("config");

const app = express();

//Body parser middleware
app.use(express.json());

//DB config , => config/keys is where the mongoURI string is located
const db = config.get("mongoURI");

//Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

//Use routes
app.use("/api/items", require("./routes/api/items")); //items = variable on top of this page
app.use("/api/users", require("./routes/api/users"));
//Serve static assets when in production
if (process.env.NODE.ENV === "production") {
  //when in production set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
