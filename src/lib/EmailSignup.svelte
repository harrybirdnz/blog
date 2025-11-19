<script>
  import posthog from "posthog-js";

  export let audienceId = "165a12f9-c83f-4c99-9a93-fbd89e9fdac8";
  export let title = "Subscribe to my newsletter";
  export let buttonText = "Subscribe";

  let email = "";
  let loading = false;
  let message = "";
  let messageType = "";

  async function handleSubmit(e) {
    e.preventDefault();
    loading = true;
    message = "";
    messageType = "";

    const submittedEmail = email;

    console.log("Submitting:", {
      email: submittedEmail,
      audienceId,
    });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: submittedEmail,
          audienceId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Track event in PostHog on client side (session ID included automatically)
        posthog.capture("new_subscriber", {
          email: submittedEmail,
          audienceId: audienceId,
        });

        message = "Successfully subscribed! Check your email for confirmation.";
        messageType = "success";
        // Reset form
        email = "";
      } else {
        message =
          result.error || "An unexpected error occurred. Please try again.";
        messageType = "error";
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      message = "An unexpected error occurred. Please try again.";
      messageType = "error";
    } finally {
      loading = false;
    }
  }
</script>

<div class="w-full max-w-md mx-auto">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        placeholder="you@example.com"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={loading}
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
    >
      {loading ? "Subscribing..." : buttonText}
    </button>

    {#if message}
      <div
        class="p-4 rounded-lg {messageType === 'success'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'}"
      >
        {message}
      </div>
    {/if}
  </form>
</div>
