<script setup>
    import { data as posts } from '../posts.data.js'
    
    // Group posts by year
    const postsByYear = posts.reduce((acc, post) => {
      const year = new Date(post.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    }, {})
    
    // Get years in descending order
    const years = Object.keys(postsByYear).sort((a, b) => b - a)
    
    // Format date
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
    </script>
    
    <template>
      <div class="blog-posts">
        <div v-for="year in years" :key="year" class="year-group">
          <h3>{{ year }}</h3>
          <ul>
          <li v-for="post in postsByYear[year]" :key="post.url" class="post-item">
            <div class="post-header">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <a :href="post.url">{{ post.title }}</a>
            </div>
            <div v-if="post.tags.length" class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </template>
    
    <style scoped>
    .blog-posts {
      margin-top: 2rem;
    }
    .blog-posts ul {
      list-style: none;
      padding: 0;
    }
    
    .year-group {
      margin-bottom: 3rem;
    }
    
    .year-group h2 {
      border-bottom: 2px solid var(--vp-c-divider);
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .post-item {
      margin-bottom: 1rem;
    }
    
    .post-header {
      display: flex;
      gap: 1rem;
      align-items: baseline;
    }
    
    .post-date {
      font-size: 0.9rem;
      color: var(--vp-c-text-2);
      min-width: 100px;
      font-family: monospace;
    }
    
    .post-header a {
      color: var(--vp-c-brand);
      text-decoration: none;
    }
    
    .post-header a:hover {
      text-decoration: underline;
    }
    
    .post-tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
      margin-left: calc(100px + 1rem);
    }
    
    .tag {
      background-color: var(--vp-c-bg-soft);
      padding: 0.2rem 0.6rem;
      border-radius: 3px;
      font-size: 0.85rem;
      color: var(--vp-c-text-2);
    }
    </style>
