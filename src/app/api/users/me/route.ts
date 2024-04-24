import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "Invalid token",
      });
    }
    return NextResponse.json({
      status: "success",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
