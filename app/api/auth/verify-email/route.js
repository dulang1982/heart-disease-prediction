import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return Response.json({ message: "Invalid token" }, { status: 400 });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return Response.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.verified = true;
    user.verificationToken = undefined; // Remove the token after verification
    await user.save();

    return Response.json(
      { message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Error verifying email" }, { status: 500 });
  }
}
