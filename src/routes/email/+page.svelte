<script>
  import { enhance } from "$app/forms";

  let loading = false;
  let message = "";

  function handleSubmit() {
    loading = true;
    message = "";

    return async ({ result, update }) => {
      loading = false;

      if (result.type === "success" && result.data?.success) {
        message = "Email sent successfully!";
      } else if (result.data?.error) {
        message = "Failed to send email: " + result.data.error;
      } else {
        message = "An unexpected error occurred. Please try again.";
      }

      await update();
    };
  }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Send Test Email
    </h1>

    <form method="POST" use:enhance={handleSubmit}>
      <button
        type="submit"
        disabled={loading}
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
    </form>

    {#if message}
      <div
        class="mt-4 p-4 rounded-lg {message.includes('success')
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'}"
      >
        {message}
      </div>
    {/if}
  </div>
</div>
