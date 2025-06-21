import { Guest } from "@/models/guest_model";
import { Box, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";

const Table_Guest_List = ({ table_selected }: { table_selected: string }) => {
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<Guest[] | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      const res = await fetch(
        `/api/fetch_table_details?table=${table_selected}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setGuests(data);
    };

    fetchGuest();
  }, [table_selected]);

  if (error) return <div>Error: {error}</div>;
  if (!guests) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        p: 3,
        boxSizing: "border-box",
      }}
    >
      <List>
        {guests.map((value, index) => (
          <ListItem key={index} disableGutters sx={{ fontSize: 12 }}>
            {value.seat_id}
            {": "}
            {value.guest_name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Table_Guest_List;
