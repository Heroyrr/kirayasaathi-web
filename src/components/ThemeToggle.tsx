'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')) }, [])
  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('ks-theme', next ? 'dark' : 'light') } catch {}
  }
  return (
    <button
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      className="grid h-11 w-11 place-items-center rounded-2xl border-[1.5px] border-line bg-card text-lg transition hover:border-pri"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
