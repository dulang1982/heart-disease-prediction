import connectDB from "@/lib/db";
import Prediction from "@/models/Prediction";

export async function GET(req) {
  await connectDB();
  const { userId } = req.query;

  const predictions = await Prediction.find({ userId });
  return Response.json(predictions);
}
