"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        case "CallbackRouteError":
          return {
            error:
              "Unable to connect to the authentication service. Please try again later.",
          };
        default:
          return { error: "An unexpected error occurred. Please try again." };
      }
    }
    // Handle any other types of errors
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
