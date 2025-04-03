import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const token = req.nextUrl.searchParams.get("token"); // Better way to get query params

    if (!token) {
      return Response.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (user.verified) {
      return Response.json(
        { success: true, message: "Email already verified" },
        { status: 200 }
      );
    }

    user.verified = true;
    user.verificationToken = null; // Remove token after verification
    await user.save();

    return Response.json(
      { success: true, message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return Response.json(
      { success: false, message: "Error verifying email" },
      { status: 500 }
    );
  }
}
