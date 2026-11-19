import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = ['', '/pricing', '/blog', '/reviews', '/contact', '/privacy', '/terms'].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: (p === '' || p === '/blog' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: p === '' ? 1 : p === '/pricing' || p === '/blog' ? 0.8 : 0.5,
  }))
  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  return [...pages, ...posts]
}
