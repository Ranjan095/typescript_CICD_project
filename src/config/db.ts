import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected");
    client.release();
  } catch (error: any) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
}

export default connectDB;