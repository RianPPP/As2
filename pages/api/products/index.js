// API routes cho cac GET, POST, 

import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { data, error } = await supabase.from('products').select('*');
        if (error) return res.status(500).json({ error });
        res.status(200).json(data);
    }

    // Add POST in the next steps
    if (req.method === 'POST') {
        const { name, description, price, image, color, size } = req.body;
        const { data, error } = await supabase.from('products').insert([{ name, description, price, image, color, size }]).select().single();
        if (error) return res.status(500).json({ error });
        res.status(201).json(data);
    }

}
