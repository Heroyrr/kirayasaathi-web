import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog: guides for PG owners and landlords in India',
  description: 'Practical guides on collecting rent, splitting electricity, rent agreements, security deposits and managing tenants and complaints.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="py-16">
      <div className="wrap">
        <div className="mb-10 text-center">
          <span className="eyebrow">Blog</span>
          <h1 className="h2 !text-[clamp(32px,5vw,48px)]">Guides for property owners</h1>
          <p className="sub">Rent, electricity, agreements and tenants, explained simply.</p>
        </div>
        <BlogList posts={posts} />
      </div>
    </div>
  )
}
