import { sendTestEmail } from "$lib/send";

export const actions = {
  default: async () => {
    try {
      await sendTestEmail();
      return { success: true };
    } catch (error) {
      console.error("Failed to send email:", error);
      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }
  },
};
