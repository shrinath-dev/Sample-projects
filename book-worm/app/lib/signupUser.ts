"use server";
import "dotenv/config";
import { SignupDataSchema } from "./inputValidationSchema";
import { isValidEmail } from "./serverActions/checkExistingEmail";
import { auth } from "./auth";

export async function createUser(
  initialState: any,
  formData: FormData,
): Promise<{
  success: boolean;
  message: string;
  isDuplicateEmail?: boolean;
  isDuplicateUsername?: boolean;
}> {
  const fullname = formData.get("fullname") as string;
  // const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const schemaCheckResult = SignupDataSchema.pick({
    fullname: true,
    // username: true,
    email: true,
    password: true,
  }).safeParse({ fullname, email, password });

  if (schemaCheckResult.success) {
    //is username available
    const isNonExistingEmail = await isValidEmail(email);
    if (isNonExistingEmail) {
      const response = await auth.api.signUpEmail({
        body: {
          email: email,
          password: password,
          name: fullname,
        },
      });
      if (response.user) {
        return {
          success: true,
          message: "user created successfully",
        };
      }
    } else {
      return {
        success: false,
        message: `${email} this email already exist. Please login using this email.`,
        isDuplicateEmail: true,
      };
    }
  }
  if (schemaCheckResult.error) {
    return {
      success: false,
      message: schemaCheckResult.error.message,
    };
  }

  return {
    success: false,
    message: "Unexpected error occur please try later.",
  };
}
