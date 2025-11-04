<script>
  let { data } = $props();
</script>

<div class="container mx-auto pt-5 px-4 max-w-4xl">
  <h1 class="text-center text-3xl font-bold mb-8">Harry Bird</h1>

  <div class="space-y-8">
    {#each data.posts as post}
      <article class="border-b border-gray-300 pb-6">
        <a href="/{post.slug}" class="group">
          <h2
            class="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors"
          >
            {post.title}
          </h2>
          <time class="text-sm text-gray-600 mb-2 block">{post.date}</time>
          <p class="text-gray-700">
            {post.excerpt}
          </p>
          <span
            class="text-blue-600 text-sm mt-2 inline-block group-hover:underline"
          >
            Read more →
          </span>
        </a>
      </article>
    {/each}
  </div>
</div>
