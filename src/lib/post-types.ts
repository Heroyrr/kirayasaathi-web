export type Post = {
  slug: string
  title: string
  description: string
  category: string
  date: string // YYYY-MM-DD
  emoji: string
  keywords: string[]
  readingMinutes: number
}

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })