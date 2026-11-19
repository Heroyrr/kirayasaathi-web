'use client'
import { useMemo, useState } from 'react'
import PostCard from './PostCard'
import type { Post } from '@/lib/posts'

export default function BlogList({ posts }: { posts: Post[] }) {
  const cats = useMemo(() => ['All', ...Array.from(new Set(posts.map((p) => p.category)))], [posts])
  const [cat, setCat] = useState('All')
  const [shown, setShown] = useState(6)
  const list = posts.filter((p) => cat === 'All' || p.category === cat)
  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Blog categories">
        {cats.map((c) => (
          <button key={c} onClick={() => { setCat(c); setShown(6) }} aria-pressed={cat === c} className={`chip-btn ${cat === c ? 'chip-btn-on' : ''}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, shown).map((p) => (<PostCard key={p.slug} post={p} />))}
      </div>
      {list.length > shown ? (
        <div className="mt-8 flex justify-center"><button className="btn-o" onClick={() => setShown((n) => n + 6)}>Load more</button></div>
      ) : null}
    </div>
  )
}
