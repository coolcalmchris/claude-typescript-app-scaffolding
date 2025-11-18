import { useEffect } from 'react'

export interface SEOProps {
  /** Page title */
  title?: string
  /** Page description */
  description?: string
  /** Keywords for the page */
  keywords?: string
  /** Canonical URL */
  canonical?: string
  /** Open Graph image URL */
  ogImage?: string
  /** Open Graph type */
  ogType?: 'website' | 'article' | 'profile'
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  /** Twitter handle */
  twitterCreator?: string
  /** Article published time (ISO 8601) */
  publishedTime?: string
  /** Article modified time (ISO 8601) */
  modifiedTime?: string
  /** Article author */
  author?: string
  /** Robots meta content */
  robots?: string
  /** JSON-LD structured data */
  jsonLd?: object
}

/**
 * SEO Component
 *
 * Dynamically updates page meta tags for SEO and social sharing.
 * Use this component in your pages/routes to set custom meta information.
 *
 * @example
 * ```tsx
 * function BlogPost() {
 *   return (
 *     <>
 *       <SEO
 *         title="My Blog Post - Site Name"
 *         description="Learn about React performance optimization"
 *         keywords="react, performance, optimization"
 *         canonical="https://example.com/blog/my-post"
 *         ogImage="https://example.com/images/blog-post.jpg"
 *         ogType="article"
 *         publishedTime="2025-01-01T00:00:00Z"
 *         author="John Doe"
 *       />
 *       <article>...</article>
 *     </>
 *   )
 * }
 * ```
 */
export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterCreator,
  publishedTime,
  modifiedTime,
  author,
  robots,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }

    // Helper to update or create meta tag
    const updateMetaTag = (
      selector: string,
      content: string,
      attribute: 'name' | 'property' = 'name'
    ) => {
      let element = document.querySelector(
        `meta[${attribute}="${selector}"]`
      ) as HTMLMetaElement

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, selector)
        document.head.appendChild(element)
      }

      element.content = content
    }

    // Update basic meta tags
    if (description) {
      updateMetaTag('description', description)
      updateMetaTag('og:description', description, 'property')
      updateMetaTag('twitter:description', description)
    }

    if (keywords) {
      updateMetaTag('keywords', keywords)
    }

    if (author) {
      updateMetaTag('author', author)
    }

    if (robots) {
      updateMetaTag('robots', robots)
    }

    // Update canonical link
    if (canonical) {
      let link = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement

      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }

      link.href = canonical
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, 'property')
      updateMetaTag('twitter:title', title)
    }

    if (canonical) {
      updateMetaTag('og:url', canonical, 'property')
      updateMetaTag('twitter:url', canonical)
    }

    updateMetaTag('og:type', ogType, 'property')

    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property')
      updateMetaTag('twitter:image', ogImage)
    }

    // Update Twitter Card tags
    updateMetaTag('twitter:card', twitterCard)

    if (twitterCreator) {
      updateMetaTag('twitter:creator', twitterCreator)
    }

    // Update article meta tags
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, 'property')
    }

    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, 'property')
    }

    if (author && ogType === 'article') {
      updateMetaTag('article:author', author, 'property')
    }

    // Update JSON-LD structured data
    if (jsonLd) {
      let script = document.querySelector(
        'script[type="application/ld+json"][data-dynamic]'
      )

      if (!script) {
        script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.setAttribute('data-dynamic', 'true')
        document.head.appendChild(script)
      }

      script.textContent = JSON.stringify(jsonLd)
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    twitterCard,
    twitterCreator,
    publishedTime,
    modifiedTime,
    author,
    robots,
    jsonLd,
  ])

  // This component doesn't render anything
  return null
}

/**
 * Hook to update page title
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   usePageTitle('My Page - Site Name')
 *   return <div>...</div>
 * }
 * ```
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    return () => {
      document.title = prevTitle
    }
  }, [title])
}

/**
 * Generate JSON-LD for an article
 */
export function generateArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedTime,
  modifiedTime,
  authorName,
  authorUrl,
}: {
  title: string
  description: string
  url: string
  imageUrl?: string
  publishedTime: string
  modifiedTime?: string
  authorName: string
  authorUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
  }
}

/**
 * Generate JSON-LD for a breadcrumb
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
