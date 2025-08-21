// api/send-otp.js
import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone and OTP are required" });
  }

  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP_NUMBER,
      to: "whatsapp:" + phone,
      body: `Your Drop2Life OTP is: ${otp}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
