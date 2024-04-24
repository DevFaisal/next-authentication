import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ forgotPasswordToken: token });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: "Password changed" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
