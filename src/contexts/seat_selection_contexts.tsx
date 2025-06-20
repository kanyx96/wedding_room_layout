import { createContext } from "react";

export type seat_selected_context_type = {
    seat_selected: string | null;
    set_seat_selected: (seat_selected: string) => void;
}

export const seat_selected_context = createContext<seat_selected_context_type>({
  seat_selected: null,
  set_seat_selected: () => {},
});