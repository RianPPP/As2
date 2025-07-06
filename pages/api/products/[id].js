//Fetching a single product
// Đây là API back-end truy vâsn supabse để lấy dữ liệu sản phẩm
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    if (method === 'GET') {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(data);
    } 

    //Updating a single product
    if (method === 'PUT') {
        const { name, description, price, image, color, size } = req.body;
        const { data, error } = await supabase
            .from('products')
            .update({ name, description, price, image, color, size })
            .eq('id', id)
            .select()
            .single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    }



    if (method === 'DELETE') {
        const { data, error } = await supabase.from('products').delete().eq('id', id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(204).end();
    }


    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);

}
