const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const todoCrudRouter = require("./routes/crudRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
app.use("/todo-crud", todoCrudRouter);
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => {
  console.log("Started on Port:", port);
});
