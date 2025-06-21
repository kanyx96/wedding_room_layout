// src/app/api/guest/fetch_details/route.ts
import { supabase } from '@/lib/supabaseClient';
// import { Guest } from '@/models/guest_model';
import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const seat_id = searchParams.get('seat_id');

//     if (!seat_id) {
//       return NextResponse.json({ error: 'Missing seat_id parameter' }, { status: 400 });
//     }

//     const { data, error } = await supabase
//       .from('Wedding_Guest_List') 
//       .select('*')
//       .eq('seat_id', seat_id)
//       .single();

//     if (error) {
//       console.error('Supabase error:', error.message);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json(data as Guest[], { status: 200 });
//   } catch (err) {
//     console.error('Unhandled API error:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

export async function GET() {
  const { data, error } = await supabase
    .from('Wedding_Guest_List')
    .select('*');

  if (error) {
    console.error('Supabase error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('All guests:', data); // 🔍 log all rows to debug

  return NextResponse.json(data, { status: 200 });
}