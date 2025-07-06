import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductForm from '../../components/ProductForm';

export default function EditProduct() {
    const { id } = useRouter().query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(setProduct);
        }
    }, [id]);

    // const handleUpdate = async (formData) => {
    //     const res = await fetch(`/api/products/${id}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(formData),
    //     });
    //     return res; // ✅ Trả lại response để xử lý trong ProductForm
    //     // if (!res.ok) throw new Error('Failed to update');
    // };
    const handleUpdate = async (formData) => {
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        // Trả lại JSON nếu thành công, hoặc false nếu lỗi
        if (!res.ok) return { ok: false, status: res.status };
        return { ok: true, status: res.status };
    };

    return product ? <ProductForm initialData={product} onSubmit={handleUpdate} /> : <p>Loading...</p>;
}
