import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

export async function sendOTP(mobile) {
  try {
    const verification = await client.verify.v2.services(verifySid)
      .verifications
      .create({ to: `+91${mobile}`, channel: "sms" });
    return verification;
  } catch (err) {
    console.error("Twilio sendOTP error:", err);
    throw err;
  }
}

export async function verifyOTP(mobile, otp) {
  try {
    const verificationCheck = await client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: `+91${mobile}`, code: otp });
    return verificationCheck.status === "approved";
  } catch (err) {
    console.error("Twilio verifyOTP error:", err);
    return false;
  }
}
