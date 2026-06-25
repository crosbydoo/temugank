import { useState } from 'react'

import { login } from '@/lib/desk/api'
import { cn } from '@/lib/cn'

const fieldClass =
  'w-full border border-paper/15 bg-bg-deep px-3 py-2.5 font-body text-sm text-paper placeholder:text-stone/60 focus:border-sage/50 focus:outline-none'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      window.location.href = '/desk/overview'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
        Admin
      </p>
      <h1 className="mt-2 font-display text-2xl uppercase tracking-[var(--tracking-wide-editorial)] text-paper">
        Sign in
      </h1>
      <p className="mt-3 font-body text-sm text-stone">
        Desk access only. Not linked from the public site.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block space-y-2">
          <span className="font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
            Email
          </span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block space-y-2">
          <span className="font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-stone">
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
          />
        </label>
        {error ? (
          <p className="font-body text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'w-full border border-paper/25 px-5 py-3 font-display text-[0.58rem] uppercase tracking-[var(--tracking-ultra)] text-paper transition-colors hover:border-sage/60 hover:bg-sage/10',
            loading && 'opacity-60',
          )}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
