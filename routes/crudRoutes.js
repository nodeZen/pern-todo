const express = require("express");
const router = express.Router();
const pool = require("../connections/postgre");
const authorize = require("../middlewares/authorize");
const {
  selectTodos,
  insertTodo,
  updateTodo,
  deleteTodo,
} = require("../constants/queries");

router.get("/", authorize, async (req, res) => {
  try {
    const userData = await pool.query(selectTodos, [req.user]);
    res.send(userData.rows);
  } catch (err) {
    res.send({ error: err });
  }
});

router.post("/", authorize, async (req, res) => {
  try {
    const { userId, description } = req.body;
    const utcTime = new Date().toUTCString();
    const allToDos = await pool.query(insertTodo, [
      userId,
      description,
      utcTime,
    ]);
    res.send(allToDos.rows);
  } catch (err) {
    res.send({ error: err });
  }
});

router.put("/:id", authorize, async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    await pool.query(updateTodo, [description, id]);
    res.send(allToDos.rows);
  } catch (err) {
    res.send({ error: err });
  }
});

router.delete("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(deleteTodo, [id]);
    res.send({ message: "Row deleted" });
  } catch (err) {
    res.send({ error: err });
  }
});

module.exports = router;
