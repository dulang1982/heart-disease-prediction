import { verify } from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Prediction from "@/models/Prediction";

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
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const predictions = await Prediction.find({ userId: user._id }).sort({
      date: -1,
    });

    if (!predictions.length) {
      return res
        .status(404)
        .json({ message: "No predictions found" });
    }

    // Remove password from the user data
    const { password, ...userData } = user.toObject();

    return NextResponse.json(
      {
        userData,
        predictions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user or predictions" },
      { status: 500 }
    );
  }
}
