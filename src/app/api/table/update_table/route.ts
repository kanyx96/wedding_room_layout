//api/table/update_table/[table]
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Guest } from "@/models/guest_model";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const guests = body.guests;

    const updates = guests.map((guest: Guest) => {
      return supabase
        .from("Wedding_Guest_List")
        .update({
          guest_name: guest.guest_name,
          food_choice: guest.food_choice,
          allergies: guest.allergies,
          association: guest.association,
          association_grouping: guest.association_grouping,
        })
        .eq("seat_id", guest.seat_id)
        .select();
    });

    const results = await Promise.all(updates);

    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Rows updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
