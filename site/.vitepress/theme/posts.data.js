import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/!(index).md', {
  includeSrc: false, // Don't include raw markdown
  render: true,     // render to HTML
  excerpt: false,    // Don't extract excerpt
  transform(rawData) {
    return rawData
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt || '',
        tags: frontmatter.tags || []
      }))
      .sort((a, b) => {
        // Sort by date descending (newest first)
        return new Date(b.date) - new Date(a.date)
      })
  }
})
