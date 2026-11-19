import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover flex h-full flex-col">
      <div className="mb-4 grid h-36 place-items-center rounded-2xl bg-gradient-to-br from-[#0F5C68] to-[#0F7A8A] text-5xl" aria-hidden="true">{post.emoji}</div>
      <span className="text-sm font-semibold text-pri">{post.category}</span>
      <h3 className="mt-1 text-lg font-bold leading-snug">{post.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[15px] text-mute">{post.description}</p>
      <p className="mt-4 text-xs text-mute">{formatDate(post.date)} · {post.readingMinutes} min read</p>
    </Link>
  )
}
