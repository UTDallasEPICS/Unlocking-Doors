import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  secret: process.env.BETTER_AUTH_SECRET || "a_very_secure_and_long_random_string_secret",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  user: {
    additionalFields: {
      permission: {
        type: "string",
        required: false,
        defaultValue: "VIEWER",
        input: false, // Security: prevent self-assigning permissions during login
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`\n==================================================`);
        console.log(`[Better Auth OTP] Sending ${type} OTP to ${email}: ${otp}`);
        console.log(`==================================================\n`);

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.ethereal.email",
          port: parseInt(process.env.SMTP_PORT || "587"),
          auth: {
            user: process.env.SMTP_USER || "test@ethereal.email",
            pass: process.env.SMTP_PASS || "test_password",
          },
        });

        const mailOptions = {
          from: process.env.SMTP_FROM || '"Unlocking Doors" <noreply@unlocking-doors.com>',
          to: email,
          subject: `Your Unlocking Doors OTP - ${otp}`,
          text: `Your One-Time Password for Unlocking Doors is: ${otp}. It will expire in 5 minutes.`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2>Unlocking Doors OTP</h2>
              <p>Your One-Time Password (OTP) is:</p>
              <div style="background-color: #f3f4f6; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-align: center; border-radius: 8px; margin: 20px 0; width: fit-content; min-width: 150px;">
                ${otp}
              </div>
              <p>This code will expire in 5 minutes.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="font-size: 12px; color: #6b7280;">If you did not request this code, please ignore this email.</p>
            </div>
          `,
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(`[Better Auth OTP] Email sent successfully: ${info.messageId}`);
        } catch (error) {
          console.error(`[Better Auth OTP] Failed to send email to ${email}:`, error);
        }
      },
      disableSignUp: true, // Only allow admin pre-created users
    }),
  ],
});
