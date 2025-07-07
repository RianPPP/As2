import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar({ onSearch }) {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header style={navWrapper}>
      <div style={navContent}>
        {/* Logo bên trái */}
        <div style={logoStyle}>
          <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>RianShop</span>
          </Link>
        </div>

        {/* Search bar giữa */}
        <div style={searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={searchInput}
          />
        </div>

        {/* Buttons bên phải */}
        <div style={buttonGroup}>
          {user ? (
            <>
              <Link href="/create" style={buttonStyle}>+Create</Link>
              <button onClick={handleLogout} style={buttonStyle}>Logout</button>
            </>
          ) : (
            <Link href="/auth" style={buttonStyle}>Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}

// === Style ===

const navWrapper = {
  position: 'sticky',
  top: 0,
  width: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  zIndex: 999,
};

const navContent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0.5rem 1.5rem',
  height: '64px',
};

const logoStyle = {
  flex: 1,
};

const searchContainer = {
  flex: 2,
  display: 'flex',
  justifyContent: 'center',
  padding: '0 1rem',
};

const searchInput = {
  width: '100%',
  maxWidth: '300px',
  padding: '0.5rem 1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '0.9rem',
};

const buttonGroup = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.5rem',
};

const buttonStyle = {
  padding: '0.45rem 0.9rem',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 500,
  fontSize: '0.85rem',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
};
