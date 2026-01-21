//test db functionality

import { pool } from "./postgresdb.js";

const result = await pool.query("SELECT NOW()");
console.log(result.rows[0]);

await pool.end();