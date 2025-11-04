<script>
  let { data } = $props();
  const Content = data.post.content;
</script>

<svelte:head>
  <title>{data.post.title} - Harry Bird</title>
</svelte:head>

<article class="container mx-auto pt-5 px-4 max-w-4xl">
  <header class="mb-8">
    <a href="/" class="text-blue-600 hover:underline text-sm mb-4 inline-block">
      ← Back to home
    </a>
    <h1 class="text-4xl font-bold mb-2">{data.post.title}</h1>
    <time class="text-sm text-gray-600">{data.post.date}</time>
  </header>

  <div class="prose prose-lg max-w-none">
    <Content />
  </div>
</article>

<style>
  :global(.prose) {
    line-height: 1.75;
  }

  :global(.prose h1) {
    font-size: 2.25rem;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  :global(.prose h2) {
    font-size: 1.875rem;
    font-weight: bold;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
  }

  :global(.prose h3) {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  :global(.prose p) {
    margin-bottom: 1.25rem;
  }

  :global(.prose ul) {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1.25rem;
  }

  :global(.prose li) {
    margin-bottom: 0.5rem;
  }

  :global(.prose strong) {
    font-weight: bold;
  }

  :global(.prose a) {
    text-decoration: underline;
    color: #2563eb;
  }

  :global(.prose a:hover) {
    color: #1d4ed8;
  }

  :global(.prose code) {
    background-color: #f4f4f4;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }

  :global(.prose pre) {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.25rem;
  }

  :global(.prose pre code) {
    background-color: transparent;
    padding: 0;
  }
</style>
