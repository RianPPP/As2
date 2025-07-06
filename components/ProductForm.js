import { useState } from 'react';
import ImageUpload from './ImageUpload';
import { useRouter } from 'next/router';
export default function ProductForm({ initialData = {}, onSubmit }) {
    const [form, setForm] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        image: initialData.image || '',
        color: initialData.color || '',
        size: initialData.size || '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.price) {
            setMessage('⚠️ Name and price are required.');
            return;
        }

        setLoading(true);
        setMessage('');
        router.push(`/`);

        try {
            const result = await onSubmit(form);
            if (result?.ok) {
                setMessage('✅ Product saved successfully!');
            } else {
                setMessage(`❌ Error saving product. Status: ${result?.status}`);
            }
        } catch (error) {
            console.error(error);
            setMessage('❌ Unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };






    return (
        <form onSubmit={handleSubmit} style={formContainer}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {initialData.id ? '✏️ Edit Product' : (
                    <span>
                        <span style={{ fontSize: '0.9rem', padding: '2px 6px', background: '#e0f0ff', color: '#0070f3', borderRadius: '4px', marginRight: '8px' }}>NEW</span>
                        Create Product
                    </span>
                )}
            </h2>

            <div style={field}>
                <label style={label}>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required style={input} />
            </div>

            <div style={field}>
                <label style={label}>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="3" style={textarea} />
            </div>

            <div style={field}>
                <label style={label}>Price *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required style={input} />
            </div>

            <div style={field}>
                <label style={label}>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} style={input} />



                <ImageUpload onUpload={(url) => setForm({ ...form, image: url })} />
                {form.image && (
                    <img src={form.image} alt="Preview" style={{ marginTop: '1rem', height: '100px', borderRadius: '6px' }} />
                )}





            </div>

            <div style={field}>
                <label style={label}>Color</label>
                <input name="color" value={form.color} onChange={handleChange} style={input} />
            </div>

            <div style={field}>
                <label style={label}>Size</label>
                <select name="size" value={form.size} onChange={handleChange} style={select}>
                    <option value="">-- Select Size --</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>

            <button type="submit" disabled={loading} style={submitBtn}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>

            {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>}
        </form>
    );
}

// --- CSS styles as JS ---
const formContainer = {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

const field = {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
};

const label = {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
};

const input = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const textarea = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
};

const select = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const submitBtn = {
    padding: '0.75rem',
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
};
