import { getSupabase } from './supabase'

export type Review = { id: number; name: string; property: string | null; rating: number; text: string; created_at: string }

/** Reviews you approved (status = published). Returns [] if Supabase is not set up yet. */
export async function getPublishedReviews(limit = 50): Promise<Review[]> {
  const sb = getSupabase()
  if (!sb) return []
  const { data, error } = await sb
    .from('reviews')
    .select('id,name,property,rating,text,created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error || !data) return []
  return data as Review[]
}
