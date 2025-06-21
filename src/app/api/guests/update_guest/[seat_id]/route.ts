import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ seat_id: string }> }
) {
  const { seat_id } = await params

  const body = await req.json()
  const { guest_name, food_choice, allergies, association, association_grouping } = body

  const { data, error } = await supabase
    .from('Wedding_Guest_List')
    .update({
      guest_name,
      food_choice,
      allergies,
      association,
      association_grouping,
    })
    .eq('seat_id', seat_id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 200 })
}
