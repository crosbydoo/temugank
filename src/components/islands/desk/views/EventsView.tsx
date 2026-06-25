import { useEffect, useState } from 'react'

import {
  DeskPanel,
  deskButtonClass,
  deskFieldClass,
  deskLabelClass,
} from '@/components/islands/desk/DeskSidebar'
import {
  createRun,
  deleteRun,
  fetchRuns,
  updateRun,
} from '@/lib/desk/api'
import type { RunEvent } from '@/types/content'

const emptyForm = {
  title: '',
  location: '',
  dateLabel: '',
  note: '',
}

export function EventsView() {
  const [items, setItems] = useState<RunEvent[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setItems(await fetchRuns())
  }

  useEffect(() => {
    let active = true

    async function loadInitial() {
      try {
        const data = await fetchRuns()
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
        await updateRun(editingId, form)
      } else {
        await createRun(form)
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

  function startEdit(item: RunEvent) {
    setEditingId(item.id)
    setForm({
      title: item.title,
      location: item.location,
      dateLabel: item.dateLabel,
      note: item.note,
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this event?')) return
    await deleteRun(id)
    if (editingId === id) {
      setEditingId(null)
      setForm(emptyForm)
    }
    await refresh()
  }

  return (
    <DeskPanel title="Events" description="Create and manage upcoming runs stored in D1.">
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
        <label className="block space-y-2">
          <span className={deskLabelClass}>Date label</span>
          <input
            className={deskFieldClass}
            value={form.dateLabel}
            onChange={(e) => setForm({ ...form, dateLabel: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-2">
          <span className={deskLabelClass}>Location</span>
          <input
            className={deskFieldClass}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className={deskLabelClass}>Note</span>
          <input
            className={deskFieldClass}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </label>
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button type="submit" disabled={loading} className={deskButtonClass}>
            {editingId ? 'Update event' : 'Add event'}
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
              <p className="font-display text-[0.55rem] uppercase tracking-[var(--tracking-ultra)] text-sage">
                {item.dateLabel}
              </p>
              <p className="mt-1 font-display text-sm uppercase tracking-[var(--tracking-wide-editorial)] text-paper">
                {item.title}
              </p>
              <p className="mt-1 font-body text-sm text-stone">
                {item.location} — {item.note}
              </p>
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
