import { createContext } from "react";

export type table_selected_context_type = {
    table_selected: string | null;
    set_table_selected: (table_selected: string | null) => void;
}

export const table_selected_context = createContext<table_selected_context_type>({
  table_selected: null,
  set_table_selected: () => {},
});