# SEO & Metadata Guide

This document outlines the SEO features and best practices implemented in this application.

## Table of Contents

- [Overview](#overview)
- [Built-in SEO Features](#built-in-seo-features)
- [Meta Tags](#meta-tags)
- [Open Graph & Social Sharing](#open-graph--social-sharing)
- [Structured Data (JSON-LD)](#structured-data-json-ld)
- [Sitemap & Robots.txt](#sitemap--robotstxt)
- [Dynamic SEO with React](#dynamic-seo-with-react)
- [Best Practices](#best-practices)
- [Testing SEO](#testing-seo)

## Overview

This application includes comprehensive SEO optimizations out of the box. All core meta tags, Open Graph tags, Twitter Cards, and structured data are configured in `index.html` and can be dynamically updated using the `SEO` component.

## Built-in SEO Features

### Default Meta Tags

**File:** `index.html`

The HTML includes essential meta tags that should be customized for your application:

```html
<!-- Primary Meta Tags -->
<meta name="title" content="TypeScript App Scaffolding" />
<meta
  name="description"
  content="A modern, scalable TypeScript application..."
/>
<meta
  name="keywords"
  content="typescript, react, vite, scaffolding, boilerplate"
/>
<meta name="author" content="Your Name or Organization" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://example.com/" />
```

**Customization Steps:**

1. Update `content` attributes with your app's information
2. Replace `https://example.com/` with your actual domain
3. Update keywords to match your application's focus

### Open Graph Tags

Open Graph tags control how your site appears when shared on social media:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:title" content="TypeScript App Scaffolding" />
<meta
  property="og:description"
  content="A modern, scalable TypeScript application..."
/>
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="TypeScript App" />
<meta property="og:locale" content="en_US" />
```

**Image Requirements:**

- **Recommended size:** 1200×630 pixels
- **Minimum size:** 600×315 pixels
- **Aspect ratio:** 1.91:1
- **Format:** JPG or PNG
- **Max file size:** < 8 MB

### Twitter Card Tags

Twitter Card tags control how your site appears when shared on Twitter/X:

```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://example.com/" />
<meta name="twitter:title" content="TypeScript App Scaffolding" />
<meta
  name="twitter:description"
  content="A modern, scalable TypeScript application..."
/>
<meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
<meta name="twitter:creator" content="@yourusername" />
<meta name="twitter:site" content="@yourusername" />
```

**Card Types:**

- `summary`: Small image, title, description
- `summary_large_image`: Large image (recommended)
- `app`: Mobile app promotion
- `player`: Video/audio content

## Meta Tags

### Essential Meta Tags

| Tag           | Purpose                                      | Example                                               |
| ------------- | -------------------------------------------- | ----------------------------------------------------- |
| `title`       | Page title in browser tab and search results | `<title>My Page - Site Name</title>`                  |
| `description` | Description in search results                | `<meta name="description" content="...">`             |
| `keywords`    | Keywords (less important now)                | `<meta name="keywords" content="...">`                |
| `author`      | Content author                               | `<meta name="author" content="...">`                  |
| `robots`      | Search engine indexing instructions          | `<meta name="robots" content="index, follow">`        |
| `canonical`   | Preferred URL for duplicate content          | `<link rel="canonical" href="...">`                   |
| `viewport`    | Mobile responsiveness                        | `<meta name="viewport" content="width=device-width">` |

### Robots Meta Tag Values

```html
<!-- Allow indexing and following links (default) -->
<meta name="robots" content="index, follow" />

<!-- Prevent indexing but allow following links -->
<meta name="robots" content="noindex, follow" />

<!-- Allow indexing but don't follow links -->
<meta name="robots" content="index, nofollow" />

<!-- Prevent indexing and following links -->
<meta name="robots" content="noindex, nofollow" />

<!-- Prevent caching -->
<meta name="robots" content="noarchive" />

<!-- Prevent showing description in search results -->
<meta name="robots" content="nosnippet" />
```

## Open Graph & Social Sharing

### Creating Social Media Images

**Tools for generating OG images:**

- [Canva](https://www.canva.com/) - Easy design tool
- [Figma](https://www.figma.com/) - Professional design
- [OG Image Generator](https://og-image.vercel.app/) - Automated generation

**Design Tips:**

1. **Keep text large and readable** (minimum 60px font size)
2. **Use high contrast** for better visibility
3. **Include your logo** for branding
4. **Keep important content centered** (some platforms crop edges)
5. **Test on multiple platforms** before publishing

### Testing Social Sharing

**Facebook/Meta:**

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Scrapes and validates OG tags
- Shows preview of how link will appear

**Twitter/X:**

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Validates Twitter Card tags
- Shows preview of card

**LinkedIn:**

- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- Validates OG tags for LinkedIn
- Shows preview

## Structured Data (JSON-LD)

Structured data helps search engines understand your content better and can enable rich results (rich snippets, knowledge panels, etc.).

### Default Structured Data

**File:** `index.html:66-85`

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TypeScript App Scaffolding",
    "description": "A modern, scalable TypeScript application...",
    "url": "https://example.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Your Organization"
    }
  }
</script>
```

### Common Schema Types

#### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "Customer Service"
  },
  "sameAs": ["https://twitter.com/company", "https://linkedin.com/company/name"]
}
```

#### Article

Use the helper function from `src/components/SEO.tsx`:

```tsx
import { generateArticleJsonLd, SEO } from '@/components/SEO'

function BlogPost() {
  const jsonLd = generateArticleJsonLd({
    title: 'My Blog Post Title',
    description: 'Post description',
    url: 'https://example.com/blog/post',
    imageUrl: 'https://example.com/images/post.jpg',
    publishedTime: '2025-01-01T00:00:00Z',
    modifiedTime: '2025-01-02T00:00:00Z',
    authorName: 'John Doe',
    authorUrl: 'https://example.com/authors/john-doe',
  })

  return (
    <>
      <SEO
        title="My Blog Post"
        description="Post description"
        jsonLd={jsonLd}
      />
      <article>...</article>
    </>
  )
}
```

#### Breadcrumb

```tsx
import { generateBreadcrumbJsonLd, SEO } from '@/components/SEO'

function ProductPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://example.com' },
    { name: 'Products', url: 'https://example.com/products' },
    { name: 'Category', url: 'https://example.com/products/category' },
    { name: 'Product Name', url: 'https://example.com/products/category/item' },
  ])

  return <SEO jsonLd={breadcrumbJsonLd} />
}
```

### Testing Structured Data

**Google Rich Results Test:**

- [Rich Results Test](https://search.google.com/test/rich-results)
- Validates JSON-LD markup
- Shows which rich results are eligible

**Schema.org Validator:**

- [Schema Markup Validator](https://validator.schema.org/)
- Validates against schema.org standards

## Sitemap & Robots.txt

### Robots.txt

**File:** `public/robots.txt`

Controls which pages search engines can crawl:

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://example.com/sitemap.xml

# Disallow specific paths (examples)
# Disallow: /admin/
# Disallow: /api/
# Disallow: /private/
```

**Customization:**

1. Replace `https://example.com` with your domain
2. Uncomment `Disallow` lines for paths you want to block
3. Add specific user-agent rules if needed

**Testing:**

- Access `https://yourdomain.com/robots.txt` to verify
- Use [Google's robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)

### Sitemap.xml

**File:** `public/sitemap.xml`

Lists all pages for search engines to discover:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Priority Values:**

- `1.0`: Homepage, most important pages
- `0.8`: Major sections
- `0.5`: Regular pages (default)
- `0.3`: Less important pages

**Change Frequency:**

- `always`: Changes every access (rare)
- `hourly`: News sites, live data
- `daily`: Blogs, frequently updated
- `weekly`: Regular updates (most common)
- `monthly`: Stable content
- `yearly`: Archive content
- `never`: Permanent content

**Generating Sitemaps:**

For dynamic content, consider using a sitemap generator:

```typescript
// Example: Generate sitemap on build
import { writeFileSync } from 'fs'

const urls = [
  { loc: 'https://example.com/', priority: 1.0 },
  { loc: 'https://example.com/about', priority: 0.8 },
  // ... more URLs
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`

writeFileSync('public/sitemap.xml', sitemap)
```

**Submit to Search Engines:**

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

## Dynamic SEO with React

### SEO Component

**File:** `src/components/SEO.tsx`

Use the `SEO` component to dynamically update meta tags for each page:

#### Basic Usage

```tsx
import { SEO } from '@/components/SEO'

function AboutPage() {
  return (
    <>
      <SEO
        title="About Us - Company Name"
        description="Learn about our mission and values"
        canonical="https://example.com/about"
      />
      <div>About page content...</div>
    </>
  )
}
```

#### Full Example

```tsx
import { SEO } from '@/components/SEO'

function ProductPage({ product }) {
  return (
    <>
      <SEO
        title={`${product.name} - Company Name`}
        description={product.description}
        keywords={`${product.category}, ${product.tags.join(', ')}`}
        canonical={`https://example.com/products/${product.slug}`}
        ogImage={product.imageUrl}
        ogType="website"
        twitterCard="summary_large_image"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.imageUrl,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
          },
        }}
      />
      <div>{/* Product content */}</div>
    </>
  )
}
```

#### Blog Post Example

```tsx
import { SEO, generateArticleJsonLd } from '@/components/SEO'

function BlogPost({ post }) {
  const articleJsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    url: `https://example.com/blog/${post.slug}`,
    imageUrl: post.coverImage,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authorName: post.author.name,
    authorUrl: `https://example.com/authors/${post.author.slug}`,
  })

  return (
    <>
      <SEO
        title={`${post.title} - Blog`}
        description={post.excerpt}
        canonical={`https://example.com/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        author={post.author.name}
        jsonLd={articleJsonLd}
      />
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  )
}
```

### Page Title Hook

For simple title updates:

```tsx
import { usePageTitle } from '@/components/SEO'

function Dashboard() {
  usePageTitle('Dashboard - Company Name')
  return <div>Dashboard content...</div>
}
```

## Best Practices

### 1. Title Tags

✅ **DO:**

- Keep titles under 60 characters (avoid truncation in search results)
- Include primary keyword near the beginning
- Use consistent branding: "Page Title - Site Name"
- Make each page title unique

```tsx
<SEO title="React Performance Optimization - Developer Blog" />
```

❌ **DON'T:**

- Keyword stuff: "React React Performance React Optimization"
- Use generic titles: "Home" or "Page 1"
- Exceed 60 characters (Google may truncate)

### 2. Meta Descriptions

✅ **DO:**

- Keep between 150-160 characters
- Include a call-to-action
- Accurately summarize page content
- Include primary keyword naturally

```tsx
<SEO description="Learn essential React performance optimization techniques to reduce load times and improve user experience. Includes code examples." />
```

❌ **DON'T:**

- Use duplicate descriptions across pages
- Exceed 160 characters
- Stuff with keywords
- Leave empty or use generic text

### 3. Canonical URLs

Always specify canonical URLs to avoid duplicate content issues:

```tsx
// Preferred URL
<SEO canonical="https://example.com/products/item" />

// Even if accessible via multiple URLs:
// - https://example.com/products/item
// - https://example.com/products/item?ref=email
// - https://example.com/products/item?utm_source=google
```

### 4. Keywords

Keywords meta tag has minimal SEO value in modern search engines, but can still be useful for internal search:

✅ **DO:**

- Use 5-10 relevant keywords
- Focus on specific, relevant terms
- Separate with commas

```tsx
<SEO keywords="react, typescript, performance, optimization, web vitals" />
```

### 5. Images for Social Sharing

✅ **DO:**

- Use absolute URLs (not relative)
- Specify image dimensions
- Use appropriate aspect ratios
- Optimize file sizes

```tsx
<SEO
  ogImage="https://example.com/images/og-image.jpg"
  // Default in index.html includes width and height
/>
```

### 6. Structured Data

✅ **DO:**

- Use appropriate schema types
- Keep data accurate and up-to-date
- Test with Google Rich Results Test
- Include all required properties

```tsx
<SEO
  jsonLd={{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Article Title',
    datePublished: '2025-01-01T00:00:00Z',
    author: {
      '@type': 'Person',
      name: 'Author Name',
    },
  }}
/>
```

## Testing SEO

### Tools

1. **Google Search Console**
   - Monitor search performance
   - Submit sitemaps
   - Check indexing status
   - [Console](https://search.google.com/search-console)

2. **Google Lighthouse**
   - Run SEO audits
   - Check performance impact on SEO
   - Built into Chrome DevTools

3. **Meta Tag Checkers**
   - [OpenGraph.xyz](https://www.opengraph.xyz/)
   - [Meta Tags](https://metatags.io/)
   - [HeymMeta](https://www.heymeta.com/)

4. **Structured Data Testing**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema Markup Validator](https://validator.schema.org/)

5. **Mobile-Friendly Test**
   - [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### SEO Checklist

Before deploying:

- [ ] All pages have unique titles and descriptions
- [ ] Canonical URLs are set correctly
- [ ] Open Graph images are optimized (1200×630)
- [ ] robots.txt allows indexing of public pages
- [ ] Sitemap.xml includes all important pages
- [ ] Structured data validates without errors
- [ ] Social sharing previews look correct
- [ ] All images have alt text
- [ ] URLs are clean and descriptive
- [ ] Mobile responsiveness is verified
- [ ] Page load speed is optimized
- [ ] HTTPS is enabled
- [ ] 404 pages have custom content

### Monitoring

After deployment:

1. **Submit sitemap to search engines**
   - Google Search Console
   - Bing Webmaster Tools

2. **Monitor rankings**
   - Track keyword positions
   - Monitor organic traffic in Google Analytics
   - Check search console for issues

3. **Update content regularly**
   - Fresh content ranks better
   - Update lastmod in sitemap
   - Maintain consistent publishing schedule

---

**Remember:** Good SEO is about creating high-quality, relevant content that provides value to users. Technical SEO (meta tags, structured data, etc.) supports that content, but doesn't replace it.
