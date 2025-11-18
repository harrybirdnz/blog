import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";

const resend = new Resend(RESEND_API_KEY);

export async function sendTestEmail() {
  await resend.emails.send({
    from: "notifications@harrybird.nz",
    to: "harry@harrybird.nz",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
}

export async function addToAudience(email, audienceId) {
  console.log("Adding to audience:", email, audienceId);
  const response = await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId,
  });
  console.log("Add to audience response:", response);
  return response;
}

export async function sendThankYouEmail(toEmail) {
  await resend.emails.send({
    from: "notifications@harrybird.nz",
    to: toEmail,
    subject: "Thank You for Subscribing!",
    html: "<p>Thank you for subscribing to my blog post notifications!</p>",
  });
}
