import { pool } from "../config/db";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import { comparePassword, hashPassword } from "../utils/password.util";

export const registerUserService = async (payload: RegisterDto) => {
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



};


export const loginUserService = async (payload: LoginDto) => {
  try {
    // Find user
    const result = await pool.query(
      `SELECT * FROM users WHERE mobile = $1`,
      [payload.mobile]
    );

    if (result.rowCount === 0) {
      throw new Error("Invalid mobile or password");
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await comparePassword(
      payload.password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid mobile or password");
    }

    // Generate Tokens
    const accessToken = generateAccessToken({
      id: user.id,
      mobile: user.mobile,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    // Optional: Save refresh token in DB
    await pool.query(
      `
  INSERT INTO refresh_tokens
  (user_id, token, device_name, user_agent, ip_address, expires_at)
  VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '7 days')
  `,
      [
        user.id,
        refreshToken,
        payload.deviceName,
        payload.user_agent,
        payload.ip_address,
      ]
    );

    delete user.password;

    return {
      user,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};