const { Pool } = require("pg");

const devConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL
      : devConnectionString,
});

module.exports = pool;
