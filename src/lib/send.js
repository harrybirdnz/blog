import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";
import { PostHog } from "posthog-node";

const resend = new Resend(RESEND_API_KEY);
const posthog = new PostHog("phc_G9D50T5R9NiLHXIOkfzp3GqB8YkOVdR554ad2xIkgQm", {
  host: "https://eu.i.posthog.com",
});

export async function sendTestEmail() {
  await resend.emails.send({
    from: "notifications@harrybird.nz",
    to: "harry@harrybird.nz",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
}

export async function addToAudience(email, audienceId) {
  try {
    console.log("Adding to audience:", email, audienceId);
    let res = await resend.contacts.get({
      email: email,
    });
    if (res.error === null && res.data) {
      console.log("Contact already exists:", res);
      throw new Error("This email is already subscribed");
    }
    console.log("Existing contact check:", res);
    const response = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    // Track new subscriber event in PostHog
    posthog.capture({
      distinctId: email,
      event: "new_subscriber",
      properties: {
        email: email,
        audienceId: audienceId,
      },
    });

    console.log("Add to audience response:", response);
    return response;
  } catch (error) {
    console.error("Error in addToAudience:", error);
    // Re-throw with the original error message
    throw error;
  }
}

export async function sendThankYouEmail(toEmail) {
  try {
    console.log("Attempting to send thank you email to:", toEmail);
    const result = await resend.emails.send({
      from: "notifications@harrybird.nz",
      to: toEmail,
      subject: "Thank You for Subscribing!",
      html: "<p>Thank you for subscribing to my blog post notifications!</p>",
    });
    console.log("Thank you email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to send thank you email:", error);
    // Don't throw - we don't want to fail the subscription if the email fails
    return null;
  }
}
