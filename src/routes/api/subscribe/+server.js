import { addToAudience, sendThankYouEmail } from "$lib/send";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  try {
    const { email, audienceId } = await request.json();
    // Validate email
    if (!email || !email.includes("@")) {
      return json(
        {
          success: false,
          error: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    if (!audienceId) {
      return json(
        {
          success: false,
          error: "Audience ID is required",
        },
        { status: 400 }
      );
    }

    await addToAudience(email, audienceId);
    await sendThankYouEmail(email);
    return json({ success: true });
  } catch (error) {
    console.error("Failed to add contact to audience:", error);

    // Handle specific Resend errors
    if (error.message?.includes("already exists")) {
      return json(
        {
          success: false,
          error: "This email is already subscribed",
        },
        { status: 400 }
      );
    }

    return json(
      {
        success: false,
        error: error.message || "Failed to subscribe. Please try again.",
      },
      { status: 500 }
    );
  }
}
