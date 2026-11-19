import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import PostCard from '@/components/PostCard'
import { formatDate, getAllPosts, getPost } from '@/lib/posts'
import { site, wa } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.description, url: `${site.url}/blog/${post.slug}`, publishedTime: post.date },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const related = getAllPosts().filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)
  const more = related.length ? related : getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2)
  return (
    <article className="py-14">
      <div className="wrap max-w-[760px]">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mute">
          <Link href="/" className="hover:text-pri">Home</Link> / <Link href="/blog" className="hover:text-pri">Blog</Link> / <span>{post.category}</span>
        </nav>
        <span className="text-sm font-semibold text-pri">{post.category}</span>
        <h1 className="mt-2 text-[clamp(30px,4.5vw,44px)] font-extrabold leading-[1.1] tracking-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-mute">{post.description}</p>
        <p className="mt-4 text-sm text-mute">{formatDate(post.date)} · {post.readingMinutes} min read · By the {site.name} team</p>
        <div className="article mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-hd to-[#0F5C68] p-8 text-center text-white">
          <h2 className="text-2xl font-extrabold">Manage all of this in one app</h2>
          <p className="mx-auto mb-5 mt-2 max-w-md text-[#CFE3E6]">{site.name} helps you track rent, invoices, tenants and complaints. Try it free for 30 days.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-g">Start free trial</Link>
            <a href={wa('Hi KirayaSaathi, I read your blog and want to know more.')} target="_blank" rel="noopener noreferrer" className="btn border-[1.5px] border-white/40 text-white">WhatsApp us</a>
          </div>
        </div>

        {more.length > 0 ? (
          <div className="mt-14">
            <h2 className="mb-5 text-2xl font-extrabold">Keep reading</h2>
            <div className="grid gap-5 sm:grid-cols-2">{more.map((p) => (<PostCard key={p.slug} post={p} />))}</div>
          </div>
        ) : null}
      </div>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description,
            datePublished: post.date, dateModified: post.date, inLanguage: 'en-IN', keywords: post.keywords.join(', '),
            author: { '@type': 'Organization', name: site.name }, publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/icon.svg` } },
            mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          },
          {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
            ],
          },
        ]}
      />
    </article>
  )
}
