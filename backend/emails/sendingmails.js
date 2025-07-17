import { verificationCode } from "../utlis/verificationToken.js";
import { resend } from "./resend.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplate.js";
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await resend.emails.send({
      from: 'blogapp<no-reply@sachinpoudel.com.np>',
      to: `${email}`,
      subject: 'Verify your email address',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode)
    });
    return response;
  } catch (error) {
    throw new Error("Failed to send verification email: " + error.message);
  }
};
export const resetPassEmail = async (email, resetURL) => {
  try {
    const response = await resend.emails.send({
      from: 'blogapp<no-reply@sachinpoudel.com.np>',
      to: `${email}`,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
    });
    return response;
  } catch (error) {
    throw new Error("Failed to send resetpassword  email: " + error.message);
  }
};