import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // 💡 Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from('products').select('*');
            if (error) {
                console.error(error);
            } else {
                setAllProducts(data);
                setFilteredProducts(data);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (query) => {
        const filtered = allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1); // reset to first page when searching
    };

    // 🔢 Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <>

            <div style={{ padding: '2rem' }}>
                {/* Navigation */}
                <Navbar onSearch={handleSearch} />
                {/* Banner - Full Width */}
                <div style={bannerWrapper}>
                    <img src="/images/banner.png" alt="Banner" style={bannerImage} />
                </div>
                {/* Product Grid */}
                <ProductGrid products={paginatedProducts} />

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div style={paginationStyle}>
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            style={pageButton}
                        >
                            ◀ Prev
                        </button>
                        <span style={{ margin: '0 1rem' }}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            style={pageButton}
                        >
                            Next ▶
                        </button>
                    </div>
                )}
            </div>
        </>);
}

// 🔽 Style
const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
};

const pageButton = {
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    margin: '0 0.5rem',
};

const navLink = {
    textDecoration: 'none',
    color: '#0070f3',
    fontWeight: 'bold',
};

const bannerWrapper = {
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  width: '100vw',
  overflow: 'hidden',
  zIndex: 1,
};

const bannerImage = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

