import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' })

  const { guest_name, seat_id, food_choice, allergies, association, association_grouping } = req.body

  const { data, error } = await supabase
    .from('Wedding_Guest_List')
    .update({ guest_name, food_choice, allergies, association, association_grouping })
    .eq('seat_id', seat_id)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}
