"use server";
import "dotenv/config";
import { SignupDataSchema } from "../inputValidationSchema";
import { isValidEmail } from "./checkExistingEmail";
import { isValidUsername } from "./checkExistingUsername";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const schemaCheckResult = SignupDataSchema.pick({
    fullname: true,
    username: true,
    email: true,
    password: true,
  }).safeParse({ fullname, username, email, password });

  if (schemaCheckResult.success) {
    //is username available
    const isValid = await isValidUsername(username as string);
    if (isValid) {
      // check is email exist before
      const isNonExistingEmail = await isValidEmail(email as string);
      if (isNonExistingEmail) {
        //here we create a user

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        const result = await prisma.user.create({
          data: {
            fullname,
            username,
            email,
            password: hash,
          },
        });

        if (result) {
          return redirect("/dashboard");
        }
      } else {
        return {
          success: false,
          message: `${email} this email already exist. Please login using this email.`,
          isDuplicateEmail: true,
        };
      }
    } else {
      return {
        success: false,
        message: `${username} is already taken. Try another username.`,
        isDuplicateUsername: true,
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
