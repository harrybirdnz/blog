<script>
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import EmailSignup from "$lib/EmailSignup.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
{@render children?.()}

<div class="border rounded-xl w-fit mx-auto pt-8 pb-12 px-10 mt-16 mb-8">
  <EmailSignup
    title="Subscribe for new post updates"
    buttonText="Subscribe"
    includeNames={false}
  />
</div>
