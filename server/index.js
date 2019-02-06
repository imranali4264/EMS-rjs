const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const FakeDb = require("./fake-db");
const path = require("path");

const employees = require("./routes/employees");
const users = require("./routes/users");

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
      const fakeDb = new FakeDb();
      //fakeDb.seedDb();
    }
  })
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

const app = express();

app.use(bodyParser.json());

app.use("/api/employees", employees);
app.use("/api/users", users);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "dist");
  app.use(express.static(appPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
