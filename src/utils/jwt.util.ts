import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.types";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const decodedAccessToken = (token: string) => {
  const decoded = jwt.verify(
    token,
    ACCESS_SECRET!
  ) as AuthRequest["user"];
  return decoded;
};


export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};