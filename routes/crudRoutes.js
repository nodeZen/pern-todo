const express = require("express");
const router = express.Router();
const pool = require("../connections/postgre");
const authorize = require("../middlewares/authorize");

router.get("/", authorize, async (req, res) => {
  try {
    const userData = await pool.query(
      "SELECT * FROM todo WHERE user_id=$1",
      [req.user]
    );
    res.send(userData.rows);
  } catch (err) {
    res.send({ error: err });
  }
});

router.post("/", authorize,async (req, res) => {
  console.log(req.body,"Request Body")
  try {
    const { userId, description } = req.body;
    const allToDos = await pool.query(
      "INSERT INTO todo (user_id,description) values ($1,$2) RETURNING *",
      [userId, description]
    );
    res.send(allToDos.rows);
  } catch (err) {
    res.send({ error: err });
  }
});

router.put("/:id",authorize ,async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [
      description,
      id,
    ]);
    res.send(allToDos.rows);
  } catch (err) {
    res.send({ error: err });
  }
});

router.delete("/:id",authorize, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
    res.send({ message: "Row deleted" });
  } catch (err) {
    res.send({ error: err });
  }
});

module.exports = router;
