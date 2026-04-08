import dotenv from "dotenv";
import pool from "./db.js";
import { getPostSummary } from "./summaries.js";

dotenv.config();

async function backfillSummaries() {
  const result = await pool.query(`
    SELECT
      p.id,
      p.title,
      p.content,
      c.name AS category_name
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.id;
  `);

  for (const post of result.rows) {
    const summary = await getPostSummary(post);
    await pool.query("UPDATE posts SET summary = $1 WHERE id = $2", [
      summary,
      post.id,
    ]);
  }

  console.log("Summary backfill complete.");
}

backfillSummaries()
  .catch((error) => {
    console.error("Summary backfill failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
