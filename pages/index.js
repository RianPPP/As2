// //Home page

// import { useEffect, useState } from 'react';
// import ProductCard from '../components/ProductCard';

// export default function Home() {
//     const [products, setProducts] = useState([]);
//     const [query, setQuery] = useState('');
//     const [page, setPage] = useState(1);
//     const itemsPerPage = 6;

//     const paginated = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);


//     <input
//         type="text"
//         placeholder="Search..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         style={{ margin: '1rem 0', padding: '0.5rem', width: '300px' }}
//     />

//     {
//         products
//             .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
//             .map(product => (
//                 <ProductCard key={product.id} product={product} />
//             ))
//     }
//     useEffect(() => {
//         fetch('/api/products')
//             .then(res => res.json())
//             .then(data => setProducts(data));
//     }, []);



//     return (
//         <div>
//             <header>
//                 <h1>Clothing Store</h1>
//                 <nav>
//                     <a href="/">Home</a> | <a href="/create">Create Product</a>
//                 </nav>
//             </header>

//             <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
//                 {products.map(product => (
//                     <ProductCard key={product.id} product={product} />
//                 ))}
//             </main>
//             <div style={{ marginTop: '2rem' }}>
//                 <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
//                 <span style={{ margin: '0 1rem' }}>Page {page}</span>
//                 <button disabled={page * itemsPerPage >= products.length} onClick={() => setPage(page + 1)}>Next</button>
//             </div>
//         </div>


//     );

// }
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
        setPage(1); // Reset to first page when searching
    };

    return (
        <div style={{ padding: '2rem' }}>
            {/* Navigation */}
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}
            >
                {/* Trái: logo giả nếu cần thêm sau */}
                <div style={{ flex: 1 }}></div>

                {/* Giữa: Tên Shop với link về trang chủ */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <a href="/" style={{ fontSize: '2rem', textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>
                        RianShop
                    </a>
                </div>

                {/* Phải: Menu + Search */}
                <nav
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    <a href="/create" style={navLink}>+Create</a>

                    <input
                        type="text"
                        placeholder="🔎Search..."
                        value={query}
                        onChange={handleSearchChange}
                        style={{
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            width: '200px',
                        }}
                    />
                </nav>
            </header>


            {/* Product Grid */}
            <main
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    //justifyItems: 'stretch',
                }}
            >
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </main>

            {/* Pagination */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    style={pageButton}
                >
                    ← Previous
                </button>

                <span style={{ margin: '0 1rem' }}>
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    style={pageButton}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

const navLink = {
    textDecoration: 'none',
    color: '#0070f3',
    fontWeight: 'bold',
};

const pageButton = {
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    margin: '0 0.5rem',
};
