import { logout } from "@/lib/actions/logout";
import { NextResponse } from "next/server";

export async function GET() {
  await logout();
  return NextResponse.redirect(
    new URL("/session/expired", process.env.BASE_URL),
  );
}
