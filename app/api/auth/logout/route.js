import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Clear authentication cookies
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", { expires: new Date(0), path: "/" }); // Expire the token

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
