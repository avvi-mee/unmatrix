import { useState, useEffect, useCallback } from 'react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string
const STORAGE_KEY = 'admin_auth'

const LEAD_STATUSES = ['new', 'in_progress', 'won', 'lost', 'fake'] as const
const CONTACT_STATUSES = ['new', 'replied', 'closed', 'spam'] as const

type LeadStatus = typeof LEAD_STATUSES[number]
type ContactStatus = typeof CONTACT_STATUSES[number]

const STATUS_STYLES: Record<string, string> = {
  new: 'text-white/50',
  in_progress: 'text-amber-400',
  won: 'text-emerald-400',
  lost: 'text-red-400',
  fake: 'text-white/25',
  replied: 'text-violet-400',
  closed: 'text-white/25',
  spam: 'text-rose-400',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  in_progress: 'In Progress',
  won: 'Won',
  lost: 'Lost',
  fake: 'Fake',
  replied: 'Replied',
  closed: 'Closed',
  spam: 'Spam',
}

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  requirement: string
  message: string
  status: LeadStatus
  created_at: string
}

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  message: string
  status: ContactStatus
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string
  options: readonly string[]
  onChange: (s: string) => void
}) {
  return (
    <select
      value={value || 'new'}
      onChange={(e) => onChange(e.target.value)}
      style={{ background: 'transparent' }}
      className={`text-xs border border-white/10 rounded-full px-2 py-0.5 outline-none cursor-pointer transition-colors ${STATUS_STYLES[value] ?? STATUS_STYLES.new}`}
    >
      {options.map((s) => (
        <option key={s} value={s} style={{ background: '#111', color: '#fff' }}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  )
}

export function Admin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(STORAGE_KEY) === ADMIN_PASSWORD)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [activeTab, setActiveTab] = useState<'leads' | 'contacts'>('leads')
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')

  const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '')

  const fetchData = useCallback(async () => {
    setLoading(true)
    setFetchError('')
    try {
      const res = await fetch(`${apiUrl}/api/admin/data`, {
        headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
      })
      if (!res.ok) throw new Error('Unauthorized')
      const data = await res.json()
      setLeads(data.leads ?? [])
      setContacts(data.contacts ?? [])
    } catch {
      setFetchError('Failed to fetch data. Check server connection.')
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  useEffect(() => {
    if (authed) fetchData()
  }, [authed, fetchData])

  useEffect(() => {
    if (!authed) return
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [authed, fetchData])

  const updateStatus = async (type: 'lead' | 'contact', id: string, status: string) => {
    // Optimistic update
    if (type === 'lead') {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: status as LeadStatus } : l)))
    } else {
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: status as ContactStatus } : c)))
    }
    try {
      await fetch(`${apiUrl}/api/admin/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ADMIN_PASSWORD}`,
        },
        body: JSON.stringify({ type, id, status }),
      })
    } catch {
      console.error('Status update failed')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, password)
      setAuthed(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setAuthed(false)
    setPassword('')
    setLeads([])
    setContacts([])
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="glass-card w-full max-w-sm p-8">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Unmatrix Admin</h1>
          <p className="text-white/40 text-sm mb-6">Enter password to access dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="glass-input"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-body">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-lg">Unmatrix Admin</span>
        <button
          onClick={handleLogout}
          className="text-white/50 hover:text-white text-sm transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'leads'
                ? 'bg-white text-black'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'bg-white text-black'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            Contacts ({contacts.length})
          </button>
          <button
            onClick={fetchData}
            disabled={loading}
            className="ml-auto text-white/40 hover:text-white text-xs transition-colors disabled:opacity-40"
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {fetchError && <p className="text-red-400 text-sm mb-4">{fetchError}</p>}

        {activeTab === 'leads' ? (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['#', 'Name', 'Phone', 'Email', 'Requirement', 'Message', 'Status', 'Date'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-white/30 text-center">
                        No leads yet
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead, i) => (
                      <tr
                        key={lead.id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-white/30">{i + 1}</td>
                        <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{lead.name}</td>
                        <td className="px-4 py-3 text-white/60 whitespace-nowrap">{lead.phone}</td>
                        <td className="px-4 py-3 text-white/60 whitespace-nowrap">{lead.email}</td>
                        <td className="px-4 py-3 text-white/60 whitespace-nowrap">{lead.requirement}</td>
                        <td className="px-4 py-3 text-white/50 max-w-xs truncate">{lead.message || '—'}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusSelect
                            value={lead.status ?? 'new'}
                            options={LEAD_STATUSES}
                            onChange={(s) => updateStatus('lead', lead.id, s)}
                          />
                        </td>
                        <td className="px-4 py-3 text-white/40 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['#', 'Name', 'Email', 'Phone', 'Company', 'Message', 'Status', 'Date'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-white/30 text-center">
                        No contacts yet
                      </td>
                    </tr>
                  ) : (
                    contacts.map((contact, i) => (
                      <tr
                        key={contact.id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-white/30">{i + 1}</td>
                        <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{contact.name}</td>
                        <td className="px-4 py-3 text-white/60 whitespace-nowrap">{contact.email}</td>
                        <td className="px-4 py-3 text-white/60 whitespace-nowrap">{contact.phone || '—'}</td>
                        <td className="px-4 py-3 text-white/60 whitespace-nowrap">{contact.company || '—'}</td>
                        <td className="px-4 py-3 text-white/50 max-w-xs truncate">{contact.message}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusSelect
                            value={contact.status ?? 'new'}
                            options={CONTACT_STATUSES}
                            onChange={(s) => updateStatus('contact', contact.id, s)}
                          />
                        </td>
                        <td className="px-4 py-3 text-white/40 whitespace-nowrap">{formatDate(contact.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
