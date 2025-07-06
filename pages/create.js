// Trang tạo sản phẩm nè

import ProductForm from '../components/ProductForm';
import { useRouter } from 'next/router';

export default function CreateProduct() {
  const router = useRouter();

  const handleCreate = async (formData) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error('Failed to create');

    const data = await res.json();
    router.push(`/product/${data.id}`);
  };

  return <ProductForm onSubmit={handleCreate} />;
}
