const {Pool} = require('pg');
const poolConfig = require('../config/postgre');

const prodConfig = {
    connectionString:process.env.DATABASE_URL
}


const pool = new Pool(process.env.NODE_ENV === "production"?prodConfig:poolConfig);

module.exports = pool;
