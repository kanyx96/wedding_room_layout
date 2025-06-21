"use client";

import Room_Schematic from "@/components/room_schematics";
import styles from "./styles.module.css";
import { useState } from "react";
import { seat_selected_context } from "@/contexts/seat_selection_contexts";
import Guest_Form from "@/components/guest_form";

export default function Home() {
  const [seat_selected, set_seat_selected] = useState<string | null>(null);

  return (
    <seat_selected_context.Provider
      value={{ seat_selected, set_seat_selected }}
    >
      <div className={styles.base_container}>
        <Room_Schematic />
        {seat_selected ? <Guest_Form seat_id={seat_selected} /> : null}
      </div>
    </seat_selected_context.Provider>
  );
}
