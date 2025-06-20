"use client";

import Room_Schematic from "@/components/room_schematics";
import styles from "./styles.module.css";
import { useState } from "react";
import { seat_selected_context } from "@/contexts/seat_selection_contexts";
import { table_selected_context } from "@/contexts/table_selection_contexts";
import Guest_Form from "@/components/guest_form";
import Table_Guest_List from "@/components/table_guest_list";

export default function Home() {
  const [seat_selected, set_seat_selected] = useState<string | null>(null);
  const [table_selected, set_table_selected] = useState<string | null>(null);

  return (
    <seat_selected_context.Provider
      value={{ seat_selected, set_seat_selected }}
    >
      <table_selected_context.Provider
        value={{ table_selected, set_table_selected }}
      >
        <div className={styles.base_container}>
          <Room_Schematic />
          <div style={{ width: "50%" }}>
            {seat_selected ? (
              <Guest_Form seat_id={seat_selected} />
            ) : table_selected ? (
              <Table_Guest_List table_selected={table_selected} />
            ) : null}
          </div>
        </div>
      </table_selected_context.Provider>
    </seat_selected_context.Provider>
  );
}
