import { filledSeatsContext } from "@/contexts/seat_selection_contexts";
import { table_selected_context } from "@/contexts/table_selection_contexts";
import { Guest } from "@/models/guest_model";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Table_Guest_List = ({ table_selected }: { table_selected: string }) => {
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchGuest = async () => {
      setLoading(true)
      const res = await fetch(
        `/api/table/fetch_table_details?table=${table_selected}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setLoading(false)
        return;
      }

      setGuests(data);
      setLoading(false)
    };

    fetchGuest();
  }, [table_selected]);

  const handleInputChange = (
    seatId: string,
    field: keyof Guest,
    value: string
  ) => {
    setGuests((prev) =>
      prev.map((row) =>
        row.seat_id === seatId ? { ...row, [field]: value } : row
      )
    );
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  
  const {fetchFilledSeats} = useContext(filledSeatsContext)

  const update_rows = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/table/update_table", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guests: guests }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update rows");
      }

      setSnackbarMessage("Successfully updated Table");
      fetchFilledSeats()
      setLoading(false)
      
    } catch (error: any) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unknown error occurred.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } 
  };

  if (error)
    return (
      <Typography variant="h6" sx={{ paddingLeft: 3 }}>
        Error: {error}
      </Typography>
    );
  if (loading)
    return <CircularProgress sx={{ paddingLeft: 3, margin: "auto" }} />;

  return (
    <Grid spacing={1} sx={{ height: "80vh" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: "100%",
          height: "100%",
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
            <ListItem key={index} sx={{ width: "100%" }}>
              <Typography
                sx={{
                  minWidth: "4ch",
                  textAlign: "right",
                  fontSize: 14,
                }}
              >
                {value.seat_id + ":"}
              </Typography>
              <TextField
                sx={{ marginLeft: "10px" }}
                fullWidth
                value={value.guest_name ?? ""}
                size="medium"
                slotProps={{
                  input: { sx: { fontSize: 14 } },
                }}
                onChange={(e) =>
                  handleInputChange(value.seat_id, "guest_name", e.target.value)
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Grid container size={12} sx={{ marginTop: "10px" }}>
        {/* <Grid size={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {}}
            size="medium"
            sx={{ fontSize: 14, py: 1 }}
          >
            Clear Table
          </Button>
        </Grid> */}
        <Grid size={6} />
        <Grid size={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={update_rows}
            size="medium"
            sx={{ fontSize: 14, py: 1 }}
          >
            Update Table
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Table_Guest_List;
