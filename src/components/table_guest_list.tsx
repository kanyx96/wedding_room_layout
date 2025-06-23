import { Guest } from "@/models/guest_model";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Table_Guest_List = ({ table_selected }: { table_selected: string }) => {
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<Guest[] | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      const res = await fetch(
        `/api/table/fetch_table_details?table=${table_selected}`
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

  if (error)
    return (
      <Typography variant="h6" sx={{ paddingLeft: 3 }}>
        Error: {error}
      </Typography>
    );
  if (!guests)
    return <CircularProgress sx={{ paddingLeft: 3, margin: "auto" }} />;

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        boxSizing: "border-box",
        overflow: "auto",
        paddingLeft: 3,
      }}
    >
      <List sx={{ width: "100%" }}>
        {guests.map((value, index) => (
          <ListItem key={index} sx={{ fontSize: 16, width: "100%" }}>
            <Typography
              sx={{
                minWidth: "4ch",
                textAlign: "right",
              }}
            >
              {value.seat_id + ":"}
            </Typography>
            <TextField
              sx={{ marginLeft: "10px" }}
              fullWidth
              value={value.guest_name ?? ""}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Table_Guest_List;
