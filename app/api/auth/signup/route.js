import { hash } from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex"); // Generate token

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    // Send email verification
    await sendVerificationEmail(email, verificationToken);

    return Response.json(
      {
        message:
          "User registered, Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return Response.json({ message: "Error signing up" }, { status: 500 });
  }
}
