import matter from 'gray-matter'
import { marked } from 'marked'
import fs from 'node:fs'
import path from 'node:path'
import type { Post } from './post-types'

// keeps old imports like `import { formatDate } from '@/lib/posts'` working in server files
export { formatDate } from './post-types'
export type { Post } from './post-types'

const dir = path.join(process.cwd(), 'content', 'blog')

function read(file: string) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8')
  const { data, content } = matter(raw)
  const words = content.trim().split(/\s+/).length
  const post: Post = {
    slug: file.replace(/\.md$/, ''),
    title: String(data.title ?? file),
    description: String(data.description ?? ''),
    category: String(data.category ?? 'General'),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '2026-01-01'),
    emoji: String(data.emoji ?? '📝'),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
  }
  return { post, content }
}

/** Every article in content/blog, newest first */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => read(f).post)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): (Post & { html: string }) | null {
  const file = `${slug}.md`
  if (!fs.existsSync(path.join(dir, file))) return null
  const { post, content } = read(file)
  return { ...post, html: marked.parse(content, { async: false }) as string }
}