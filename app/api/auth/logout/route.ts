import { logout } from "@/lib/actions/logout";
import { NextResponse } from "next/server";

export async function GET() {
  await logout();
  return NextResponse.redirect(
    new URL("/auth/login", process.env.NEXTAUTH_URL || "http://localhost:3000"),
  );
}
