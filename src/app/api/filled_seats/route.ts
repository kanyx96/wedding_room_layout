import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('Wedding_Guest_List')
    .select('seat_id')
    .not('guest_name', 'is', null)
    .neq('guest_name', '');

  if (error) {
    console.error('Error fetching filled seats:', error);
    return NextResponse.json({ error: 'Failed to fetch seats' }, { status: 500 });
  }

  return NextResponse.json(data);
}