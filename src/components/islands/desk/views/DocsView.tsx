import { useEffect, useState } from 'react'

import {
  DeskPanel,
  deskButtonClass,
  deskFieldClass,
  deskLabelClass,
} from '@/components/islands/desk/DeskSidebar'
import {
  createDocLink,
  deleteDocLink,
  fetchDocLinks,
  updateDocLink,
} from '@/lib/desk/api'
import type { DocLink } from '@/lib/db/docLinks'

const emptyForm = {
  label: '',
  href: '',
  description: '',
}

export function DocsView() {
  const [items, setItems] = useState<DocLink[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setItems(await fetchDocLinks())
  }

  useEffect(() => {
    let active = true

    async function loadInitial() {
      try {
        const data = await fetchDocLinks()
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
        await updateDocLink(editingId, form)
      } else {
        await createDocLink(form)
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

  function startEdit(item: DocLink) {
    setEditingId(item.id)
    setForm({
      label: item.label,
      href: item.href,
      description: item.description,
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this doc link?')) return
    await deleteDocLink(id)
    if (editingId === id) {
      setEditingId(null)
      setForm(emptyForm)
    }
    await refresh()
  }

  return (
    <DeskPanel
      title="Documentation links"
      description="Manage links shown in the desk docs panel. Markdown guides remain in /docs."
    >
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 border border-paper/10 bg-bg-elevated/40 p-4 sm:p-5"
      >
        <label className="block space-y-2">
          <span className={deskLabelClass}>Label</span>
          <input
            className={deskFieldClass}
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-2">
          <span className={deskLabelClass}>URL</span>
          <input
            className={deskFieldClass}
            value={form.href}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
            placeholder="/docs/architecture"
            required
          />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className={deskLabelClass}>Description</span>
          <input
            className={deskFieldClass}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={loading} className={deskButtonClass}>
            {editingId ? 'Update link' : 'Add link'}
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
              <a
                href={item.href}
                className="font-display text-sm uppercase tracking-[var(--tracking-wide-editorial)] text-paper no-underline hover:text-sage"
              >
                {item.label}
              </a>
              <p className="mt-1 font-body text-sm text-stone">{item.description}</p>
              <p className="mt-1 font-display text-[0.55rem] text-stone/70">{item.href}</p>
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
