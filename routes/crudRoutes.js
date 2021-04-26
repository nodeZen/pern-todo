const express = require("express");
const router = express.Router();
const pool = require("../connections/postgre");
const authorization = require("../middlewares/authorize");

router.get("/",authorization, async (req, res) => {
  try {
    const allToDos = await pool.query("SELECT * FROM todo");
    res.send(req.user);
  } catch (err) {
    res.send({ error: err });
  }
});

router.post("/", async (req, res) => {
  try{
    const { description } = req.body;
    const allToDos = await pool.query(
      "INSERT INTO todo (description) values($1) RETURNING *",
      [description]
    );
    res.send(allToDos.rows);
  }catch(err){
    res.send({ error: err });
  }
});

router.put("/:id", async (req, res) => {
 try{
    const { description } = req.body;
    const { id } = req.params;
    await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [
      description,
      id
    ]);
    res.send(allToDos.rows);
 }catch(err){
    res.send({ error: err });
 }
});

router.delete("/:id", async (req, res) => {
    try{
       const { id } = req.params;
       await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
       res.send({message:"Row deleted"})
    }catch(err){
       res.send({ error: err });
    }
});

module.exports = router;
