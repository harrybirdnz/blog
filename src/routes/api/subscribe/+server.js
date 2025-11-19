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
    console.log(
      "Contact added successfully, waiting before sending thank you email..."
    );

    // Wait 1 second to avoid rate limit (Resend allows 2 requests per second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await sendThankYouEmail(email);
    console.log("Thank you email process completed");
    return json({ success: true });
  } catch (error) {
    console.error("Failed to add contact to audience:", error);

    // Handle specific error messages
    if (error.message?.includes("already subscribed")) {
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
