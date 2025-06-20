export type Guest = {
  guest_name: string | null;
  food_choice: string | null;
  allergies: string | null;
  association: "bride" | "groom" | null;
  association_grouping: string | null;
  table: string;
  seat_id: string;
};