import { Request, Response, NextFunction } from "express";
import { registerSchema } from "../../validators/auth.validator";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  // Replace req.body with the validated/sanitized data
  req.body = value;

  next();
};