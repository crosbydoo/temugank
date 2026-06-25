import { useEffect, useState } from 'react'

import {
  DeskPanel,
  deskButtonClass,
  deskFieldClass,
  deskLabelClass,
} from '@/components/islands/desk/DeskSidebar'
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from '@/lib/desk/api'
import type { JournalArticle } from '@/types/content'

const emptyForm = {
  title: '',
  dek: '',
  date: '',
  readTime: '',
}

export function ArticlesView() {
  const [items, setItems] = useState<JournalArticle[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setItems(await fetchArticles())
  }

  useEffect(() => {
    let active = true

    async function loadInitial() {
      try {
        const data = await fetchArticles()
        if (active) setItems(data)
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Load failed')
        }
      }
    }

    void loadInitial()

    return () => {
      active = false
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (editingId) {
        await updateArticle(editingId, form)
      } else {
        await createArticle(form)
      }
      setForm(emptyForm)
      setEditingId(null)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  function startEdit(item: JournalArticle) {
    setEditingId(item.id)
    setForm({
      title: item.title,
      dek: item.dek,
      date: item.date,
      readTime: item.readTime,
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this article?')) return
    await deleteArticle(id)
    if (editingId === id) {
      setEditingId(null)
      setForm(emptyForm)
    }
    await refresh()
  }

  return (
    <DeskPanel title="Articles" description="Field notes stored in D1 and shown on the home page.">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 border border-paper/10 bg-bg-elevated/40 p-4 sm:grid-cols-2 sm:p-5"
      >
        <label className="block space-y-2 sm:col-span-2">
          <span className={deskLabelClass}>Title</span>
          <input
            className={deskFieldClass}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className={deskLabelClass}>Dek</span>
          <input
            className={deskFieldClass}
            value={form.dek}
            onChange={(e) => setForm({ ...form, dek: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-2">
          <span className={deskLabelClass}>Date label</span>
          <input
            className={deskFieldClass}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-2">
          <span className={deskLabelClass}>Read time</span>
          <input
            className={deskFieldClass}
            value={form.readTime}
            onChange={(e) => setForm({ ...form, readTime: e.target.value })}
            required
          />
        </label>
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button type="submit" disabled={loading} className={deskButtonClass}>
            {editingId ? 'Update article' : 'Add article'}
          </button>
          {editingId ? (
            <button
              type="button"
              className={deskButtonClass}
              onClick={() => {
                setEditingId(null)
                setForm(emptyForm)
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      {error ? <p className="mt-4 font-body text-sm text-red-400">{error}</p> : null}

      <ul className="mt-6 divide-y divide-paper/10 border-t border-paper/10">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-display text-[0.55rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
                {item.date} · {item.readTime}
              </p>
              <p className="mt-1 font-body text-base text-paper">{item.title}</p>
              <p className="mt-1 font-body text-sm text-stone">{item.dek}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" className={deskButtonClass} onClick={() => startEdit(item)}>
                Edit
              </button>
              <button type="button" className={deskButtonClass} onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </DeskPanel>
  )
}
