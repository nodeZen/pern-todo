const {Pool} = require('pg');
const poolConfig = require('../config/postgre');

const pool = new Pool(poolConfig);

module.exports = pool;
