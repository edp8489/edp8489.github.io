<script setup>
    import { data as posts } from '../posts.data.js'
    
    defineProps({
      count: {
        type: Number,
        default: 5
      }
    })
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
    </script>
    
    <template>
      <div class="recent-posts">
        <h2>Recent Posts</h2>
        <ul>
          <li v-for="post in posts.slice(0, count)" :key="post.url">
            <span class="date">{{ formatDate(post.date) }}</span>
            <a :href="post.url">{{ post.title }}</a>
          </li>
        </ul>
      </div>
    </template>
    
    <style scoped>
    .recent-posts {
      margin: 2rem 0;
    }
    
    .recent-posts h2 {
      margin-bottom: 1rem;
    }
    
    .recent-posts ul {
      list-style: none;
      padding: 0;
    }
    
    .recent-posts li {
      margin-bottom: 1rem;
      display: flex;
      gap: 1rem;
      align-items: baseline;
    }
    
    .date {
      font-size: 0.9rem;
      color: var(--vp-c-text-2);
      min-width: 100px;
      font-family: monospace;
    }
    
    .recent-posts a {
      color: var(--vp-c-brand);
      text-decoration: none;
    }
    
    .recent-posts a:hover {
      text-decoration: underline;
    }
    </style>