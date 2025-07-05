"use client";

import Room_Schematic from "@/components/room_schematics";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { filledSeatsContext, seat_selected_context } from "@/contexts/seat_selection_contexts";
import { table_selected_context } from "@/contexts/table_selection_contexts";
import Guest_Form from "@/components/guest_form";
import Table_Guest_List from "@/components/table_guest_list";

export default function Home() {
  const [seat_selected, set_seat_selected] = useState<string | null>(null);
  const [table_selected, set_table_selected] = useState<string | null>(null);
  const [filledSeats, setFilledSeats] = useState<{ seat_id: string }[]>([]);

  const fetchFilledSeats = async () => {
    try {
      const res = await fetch("/api/filled_seats");
      const data = await res.json();
      setFilledSeats(data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  useEffect(() => {
    fetchFilledSeats();
  }, [seat_selected, table_selected]);

  return (
    <seat_selected_context.Provider
      value={{ seat_selected, set_seat_selected }}
    >
      <table_selected_context.Provider
        value={{ table_selected, set_table_selected }}
      >
        <filledSeatsContext.Provider value={{ fetchFilledSeats }}>
          <div className={styles.base_container}>
            <Room_Schematic filled_seats={filledSeats} />
            <div style={{ width: "50%" }}>
              {seat_selected ? (
                <Guest_Form seat_id={seat_selected} />
              ) : table_selected ? (
                <Table_Guest_List table_selected={table_selected} />
              ) : null}
            </div>
          </div>
        </filledSeatsContext.Provider>
      </table_selected_context.Provider>
    </seat_selected_context.Provider>
  );
}
