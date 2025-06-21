// pages/api/guests.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { Guest } from '@/models/guest_model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Guest | { error: string }>
) {
  const { seat_id } = req.query;

  if (!seat_id || typeof seat_id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid seat_id parameter' });
  }

  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('seat_id', seat_id)
    .single(); // get only one match

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Guest not found' });
  }

  res.status(200).json(data as Guest);
}

