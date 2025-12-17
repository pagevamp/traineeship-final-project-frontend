import * as z from "zod"

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const loginFormValidationSchema = z.object({
  email: z
    .email()
    .min(1, "Email is required")
    .regex(emailRegex, "Must be a valid Email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      passwordRegex,
      "Password must contain 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
})
