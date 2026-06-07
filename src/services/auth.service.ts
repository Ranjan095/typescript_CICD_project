import { pool } from "../config/db";

export const registerUserService = async (payload: any) => {

  // validation
  // hash password
  // save user

  const user = await pool.query("SELECT *  FROM users")
  return user?.rows;

}