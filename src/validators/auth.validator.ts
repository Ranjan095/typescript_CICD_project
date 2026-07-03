import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name cannot exceed 50 characters",
            "any.required": "Name is required",
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),

    mobile: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.pattern.base": "Invalid mobile number",
            "string.empty": "Mobile number is required",
            "any.required": "Mobile number is required",
        }),

    dob: Joi.date()
        .less("now")
        .required()
        .messages({
            "date.base": "Date of birth must be a valid date",
            "date.less": "Date of birth must be in the past",
            "any.required": "Date of birth is required",
        }),

    password: Joi.string()
        .min(8)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
        )
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.pattern.base":
                "Password must contain uppercase, lowercase, number, and special character",
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
});
// export const loginSchema = Joi.object({
//     mobile: Joi.string()
//         .pattern(/^[6-9]\d{9}$/)
//         .required()
//         .messages({
//             "string.pattern.base": "Invalid mobile number",
//             "string.empty": "Mobile number is required",
//             "any.required": "Mobile number is required",
//         }),

//     password: Joi.string()
//         .min(8)
//         .pattern(
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
//         )
//         .required()
//         .messages({
//             "string.min": "Password must be at least 8 characters",
//             "string.pattern.base":
//                 "Password must contain uppercase, lowercase, number, and special character",
//             "string.empty": "Password is required",
//             "any.required": "Password is required",
//         }),
// });


export const loginSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number",
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  deviceName: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Device name is required",
      "string.max": "Device name cannot exceed 100 characters",
      "any.required": "Device name is required",
    }),

  user_agent: Joi.string()
    .allow("", null)
    .optional(),

  ip_address: Joi.string()
    .ip({ version: ["ipv4", "ipv6"] })
    .allow("", null)
    .optional()
    .messages({
      "string.ip": "Invalid IP address",
    }),
});