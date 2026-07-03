import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    mobile: string;
    iat?: number;
    exp?: number;
  };
}