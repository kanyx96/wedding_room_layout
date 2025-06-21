export async function update_guest(
  seat_id: string,
  guestName?: string | null,
  foodChoice?: string | null,
  allergies?: string | null,
  association?: string | null,
  associationGrouping?: string | null
) {
  try {
    const res = await fetch(`/api/guests/update_guest/${seat_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_name: guestName ? guestName : null,
        food_choice: foodChoice ? foodChoice : null,
        allergies: allergies ? allergies : null,
        association: association ? association : null,
        association_grouping: associationGrouping ? associationGrouping : null,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Something went wrong");
    }

    const response = await res.json();
    return response.data;
  } catch (err) {
    console.error("Error updating guest:", err);
    throw err
  }
}
