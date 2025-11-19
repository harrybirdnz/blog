/**
 * Blog utilities for loading and managing markdown posts
 */

/**
 * Extract first image URL from markdown content
 * @param {string} markdown - Raw markdown content
 * @returns {string|null} Image URL or null
 */
function extractFirstImage(markdown) {
  // Match markdown image syntax: ![alt](url)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const match = markdown.match(imageRegex);
  return match ? match[2] : null;
}

/**
 * Get all blog posts with their metadata
 * @returns {Promise<Array>} Array of post objects with metadata and slug
 */
export async function getPosts() {
  const postFiles = import.meta.glob("/src/posts/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });
  const postModules = import.meta.glob("/src/posts/*.md", { eager: true });
  const posts = [];

  for (const path in postModules) {
    const post = postModules[path];
    const rawContent = postFiles[path];
    const slug = path.split("/").pop().replace(".md", "");

    const firstImage = extractFirstImage(rawContent);

    posts.push({
      slug,
      title: post.metadata.title,
      date: post.metadata.date,
      excerpt: post.metadata.excerpt,
      published: post.metadata.published,
      image: firstImage,
    });
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The post slug
 * @returns {Promise<Object>} Post object with metadata and content
 */
export async function getPost(slug) {
  const post = await import(`../posts/${slug}.md`);

  return {
    slug,
    ...post.metadata,
    content: post.default,
  };
}
