import { pool } from "../config/db";

export const getProfileService = async (userId: string) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        mobile,
        dob,
        created_at,
        updated_at
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (result.rowCount === 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};