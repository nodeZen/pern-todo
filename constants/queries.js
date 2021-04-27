// User Queries
const registerUser = "INSERT INTO users (user_name,email,password) VALUES ($1,$2,$3) RETURNING *";
const selectUser = "SELECT * FROM users WHERE email=$1";
const selectById = "SELECT * FROM users WHERE user_id=$1";
// TO DO QUERIES
const selectTodos = "SELECT * FROM todo WHERE user_id=$1 ORDER BY created_time";
const insertTodo = "INSERT INTO todo (user_id,description,created_time) values ($1,$2,$3) RETURNING *";
const updateTodo = "UPDATE todo SET description=$1 WHERE todo_id=$2";
const deleteTodo = "DELETE FROM todo WHERE todo_id=$1";
module.exports = {selectUser, registerUser, selectById, selectTodos, insertTodo, updateTodo, deleteTodo}

