const { Pool } = require("pg");
const { parse } = require("pg-connection-string");

require("dotenv").config();

const getConfig = () => {
  if (process.env.NODE_ENV === "production") {
    const config = parse(process.env.DATABASE_URL + "?sslmode=require");
    config.ssl = {
      rejectUnauthorized: false,
    };
    return config;
  }
  return {
    connectionString: process.env.DATABASE_URL,
  };
};

const pool = new Pool(getConfig());

module.exports = pool;
