import ProductCard from "./ProductCard"
import React, { useEffect, useState } from "react";

export default function ProductGrid({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  useEffect(() => {
    setFilteredProducts(products || []);
  }, [products]);

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div style={gridContainerStyle}>
      {/* <div style={posterStyle}>
        <img src="/images/Gray Minimalist New Collection Banner.png" alt="Poster" style={posterImageStyle} />
      </div> */}

      <div style={productGridStyle}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}


const gridContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px 0',
  backgroundColor: '#f9f9f9',
}

const posterStyle = {
  width: '100%',
  maxWidth: '1200px',
  marginBottom: '20px',
  padding: '10px',
}

const posterImageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
}

const productGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', 
  gap: '20px',
  maxWidth: '1200px',
  width: '100%',
  marginBottom: '30px',
}
