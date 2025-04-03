import { verify } from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("email");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ email: user.email }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
}
