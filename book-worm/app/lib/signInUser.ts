"use server";
import { auth } from "./auth";

export async function loginUser(initialState: any, data: FormData) {
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
  });

  return await response.json();
}
