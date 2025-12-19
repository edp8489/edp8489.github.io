<script setup>
    import { useData } from 'vitepress'
    import DefaultTheme from 'vitepress/theme'
    import { computed } from 'vue'
    
    const { frontmatter } = useData()
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    }
    
    const formattedDate = computed(() => {
      return frontmatter.value.date ? formatDate(frontmatter.value.date) : ''
    })

</script>

<template>
    <DefaultTheme.Layout>
        <template #home-features-before>
            <div class="VPFeatures VPHomeFeatures features-heading">
                <div class="container">
                    <h2>{{frontmatter.feature_heading}}</h2>
                </div>
            </div>
        </template>
        <template #doc-before>
            <div class="post-header">
            <h1 class="post-title">{{ frontmatter.title }}</h1>
            <p class="post-meta">
                <span v-if="frontmatter.author" class="post-author">
                {{ frontmatter.author.toUpperCase() }}
                </span>
                <span v-if="frontmatter.author && frontmatter.date" class="separator"> / </span>
                <span v-if="frontmatter.date" class="post-date">
                {{ formattedDate.toUpperCase() }}
                </span>
            </p>
            <div v-if="frontmatter.tags && frontmatter.tags.length" class="post-tags">
                <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
                {{ tag }}
                </span>
            </div>
            </div>
        </template>
        <template #doc-footer-before>
        </template>
    </DefaultTheme.Layout>
</template>

<style scoped>
    :deep(.VPHero .name){
        font-size: 3.5rem;
        letter-spacing: 0.5px;
    }
    :deep(.VPHero .text){
        font-size: 2.25rem;
    }

    :deep(.VPHero .tagline){
        font-size: 1.5rem;
        color: var(--vp-c-brand-3);
    }

    :deep(.VPFeature){
        border-color: var(--vp-c-text-1)
    }

    :deep(.VPFeature.link:hover) {
        border-color: var(--vp-c-brand-1);
    }
    .features-heading {
        padding: 0 24px;
    }

    .features-heading .container {
        margin: 0 auto;
        max-width: 1152px;
    }

    .features-heading h2{
        color: var(--moonwalk-light-link);
        margin: 2rem 0;
        margin-bottom: 1rem;
        font-weight: 600;
        font-size: 1.5rem;
        letter-spacing: -0.48px;
    }

    @media (min-width: 640px) {
        .features-heading {
            padding: 0 48px;
        }
    }
    @media (min-width: 768px) {
        :deep(.actions){
            display: none;
        }
    }

    @media (min-width: 960px) {
        .features-heading {
            padding: 0 64px;
        }
        :deep(.VPHero.has-image .main) {
            max-width: 640;
        }
    }

    .post-header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--vp-c-divider);
    }

    .post-title {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.2;
    }

    .post-meta {
        margin: 0;
        font-weight: 600;
        color: var(--vp-c-text-2);
        font-size: 0.9rem;
        letter-spacing: 0.5px;
    }

    .post-author,
    .post-date {
        text-transform: uppercase;
    }

    .separator {
        margin: 0 0.5rem;
    }

    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .tag {
        display: inline-block;
        background-color: var(--vp-c-bg-soft);
        color: var(--vp-c-text-2);
        padding: 0.25rem 0.75rem;
        border-radius: 3px;
        font-size: 0.85rem;
        font-weight: 500;
        transition: background-color 0.2s;
    }

    .tag:hover {
        background-color: var(--vp-c-bg-mute);
    }

    /* Remove the default h1 from content since we have our own */
    :deep(.vp-doc h1:first-child) {
        display: none;
    }

    .vp-feature {
    border: 1px solid var(--vp-c-text-1);
    }
</style>
