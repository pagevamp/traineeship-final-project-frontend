import * as z from "zod"
import { loginFormValidationSchema } from "../validation/login-validation"

export interface UserLoginParams {
  email: string
  password: string
}

export type LoginErrors = Partial<
  Record<keyof z.infer<typeof loginFormValidationSchema>, string>
>
