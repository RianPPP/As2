
import Link from 'next/link';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { FiMoreVertical } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();



const menuRef = useRef();

useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    if (res.status === 204 || res.ok) {
      alert('Product deleted');
      router.reload();
    } else {
      alert('Delete failed');
      router.reload();
    }
  };



  return (
    <div
      style={{
        borderRadius: '12px',
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.2s',
      }}
    >
      {/* Ảnh */}
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }}
        />
      </Link>

      {/* Nội dung */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>{product.name}</h3>
        <p style={{ color: '#777', marginBottom: '0.25rem' }}>{product.color || '#Color'}</p>
        <p style={{ fontWeight: 'bold' }}>${product.price}</p>
      </div>

      {/* Nút ba chấm */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            padding: '0',
          }}
        >
          <FiMoreVertical />
        </button>

        {/* Menu dropdown */}
{menuOpen && (
  <div ref={menuRef}
    style={{
      position: 'absolute',
      top: '28px',
      right: '0',
      background: '#fff',
      border: '1px solid #eee',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      borderRadius: '6px',
      width: '130px',
      zIndex: 1000,
    }}
  >
    <div onClick={() => router.push(`/edit/${product.id}`)} style={menuItem}>
      ✏️ Edit
    </div>
    <div
      onClick={handleDelete}
      style={{ ...menuItem, color: 'red', borderTop: '1px solid #eee' }}
    >
      🗑️ Delete
    </div>
  </div>
)}

      </div>
    </div>
  );
}

const menuItem = {
  padding: '0.75rem 1rem',
  cursor: 'pointer',
  fontSize: '0.95rem',
  background: '#fff',
};
