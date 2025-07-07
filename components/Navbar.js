// components/Navbar.js
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
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }


  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

    return (
    <header style={navWrapper}>
      <nav style={navBar}>
        {/* Logo bên trái */}
        <div style={logoStyle}>
          <Link href="/">
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
              <a href="/create" style={buttonStyle}>+Create</a>
              <button onClick={handleLogout} style={buttonStyle}>Logout</button>
            </>
          ) : (
            <a href="/auth" style={buttonStyle}>Login</a>
          )}
        </div>
      </nav>
    </header>
  );
}
// Custom styles
const navWrapper = {
  position: 'sticky',
  top: 0,
  zIndex: 999,
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

const navBar = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 2rem',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '64px',
};

const logoStyle = {
  flex: '1',
};

const searchContainer = {
  flex: '2',
  display: 'flex',
  justifyContent: 'center',
};

const searchInput = {
  width: '100%',
  maxWidth: '300px',
  padding: '0.5rem 1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
};

const buttonGroup = {
  display: 'flex',
  gap: '0.5rem',
  flex: '1',
  justifyContent: 'flex-end',
};

const buttonStyle = {
  padding: '0.4rem 0.8rem',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: '500',
  cursor: 'pointer',
};

// const navbarStyle = {
//   backgroundColor: 'black',
//   position: 'sticky',
//   top: 0,
//   zIndex: 1000,
//   padding: '0.25rem 0',  // Giảm chiều cao
// };

// const navContainer = {
//   maxWidth: '1200px',
//   margin: '0 auto',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   padding: '0.5rem 1rem',
// };

// const logoStyle = {
//   fontSize: '1.2rem',
//   color: '#fff',
//   fontWeight: 'bold',
//   flex: 1,
// };

// const searchContainer = {
//   flex: 2,
//   display: 'flex',
//   justifyContent: 'center',
// };

// const searchInputStyle = {
//   width: '100%',
//   maxWidth: '280px',
//   padding: '0.4rem 0.8rem',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
//   fontSize: '0.9rem',
// };

// const navActions = {
//   flex: 1,
//   display: 'flex',
//   justifyContent: 'flex-end',
//   alignItems: 'center',
//   gap: '0.5rem',
// };

// const buttonStyle = {
//   backgroundColor: '#fff',
//   color: '#000',
//   border: '1px solid #ccc',
//   padding: '0.4rem 0.8rem',
//   borderRadius: '4px',
//   fontWeight: 500,
//   cursor: 'pointer',
//   fontSize: '0.85rem',
// };
