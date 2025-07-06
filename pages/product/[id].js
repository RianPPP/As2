// pages/product/[id].js là front-end giao diện hiển thị chi tiết sp cho người dùng
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex', padding: '2rem', gap: '3rem' }}>
      <img
        src={product.image || '/placeholder.png'}
        alt={product.name}
        style={{ width: '50%', objectFit: 'cover', borderRadius: '8px' }}
      />

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
        <p style={{ fontSize: '1.5rem', color: '#444' }}>{Number(product.price).toLocaleString()} $</p>

        <div style={{ margin: '1.5rem 0' }}>
          <p><strong>Color:</strong> {product.color || 'Null'}</p>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button style={chipStyle}>S</button>
            <button style={chipStyle}>M</button>
            <button style={chipStyle}>L</button>
            <button style={chipStyle}>XL</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <button style={outlineBtn}>ADD TO CART</button>
          <button style={solidBtn}>BUY IT NOW</button>
        </div>

        <p style={{ marginTop: '2rem', lineHeight: 1.6 }}>
          {product.description || "This is a beautiful item made from soft, breathable fabric..."}
        </p>
      </div>
    </div>
  );
}

const chipStyle = {
  border: '1px solid #ddd',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  background: '#fff',
  cursor: 'pointer',
};

const outlineBtn = {
  border: '1px solid black',
  padding: '0.75rem 2rem',
  background: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const solidBtn = {
  background: 'black',
  color: 'white',
  padding: '0.75rem 2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
};
