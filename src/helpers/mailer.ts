import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log("email", email);
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "01209a88d40bba",
        pass: "d8a6f33d948932",
      },
    });

    const mailOptions = {
      from: "dfaisal59@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click on the link <a href=${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verify-email" : "verify-password"
      }?token=${hashToken}>here</a></p> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser</p> <p>${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verify-email" : "verify-password"
      }?token=${hashToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
