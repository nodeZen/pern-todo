// User Queries
const registerUser = "INSERT INTO users (user_name,email,password) VALUES ($1,$2,$3) RETURNING *";
const selectUser = "SELECT * FROM users WHERE email=$1";
// TO DO QUERIES
module.exports = {selectUser, registerUser}

