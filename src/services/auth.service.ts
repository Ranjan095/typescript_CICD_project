import { pool } from "../config/db";
import { hashPassword } from "../utils/password.util";
interface RegisterUserPayload {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  password: string;
}

export const registerUserService = async (payload: RegisterUserPayload) => {
  try {
    // hash password
    const hashedPassword = await hashPassword(payload.password)
    // save user
    const query = `
INSERT INTO users (name, email, mobile, dob, password)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, email, mobile, dob, created_at;
`;

    const values = [
      payload.name,
      payload.email,
      payload.mobile,
      payload.dob,
      hashedPassword,
    ];

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1 OR mobile = $2",
      [payload.email, payload.mobile]
    );

    if (existingUser.rowCount) {
      throw new Error("Email or mobile already exists");
    }

    const result = await pool.query(query, values);

    return result?.rows[0];
  } catch (error) {
    throw error;
  }



}