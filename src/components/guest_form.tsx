"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { seat_selected_context } from "@/contexts/seat_selection_contexts";
import { Guest } from "@/models/guest_model";
import { update_guest } from "./functions/update_guest_function";

const Guest_Form = ({ seat_id }: { seat_id: string }) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      const res = await fetch(
        `/api/guests/fetch_guest_details?seat_id=${seat_id}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setGuest(data);
    };

    fetchGuest();
    setGuestName(guest?.guest_name);
    setFoodChoice(guest?.food_choice);
    setallergies(guest?.allergies);
    setAssociation(guest?.association);
    setAssociationGrouping(guest?.association_grouping);
  }, [
    guest?.allergies,
    guest?.association,
    guest?.association_grouping,
    guest?.food_choice,
    guest?.guest_name,
    seat_id,
  ]);

  const clearAllFields = () => {
    setGuestName(null);
    setFoodChoice(null);
    setallergies(null);
    setAssociation(null);
    setAssociationGrouping(null);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleUpdateGuest = async () => {
    try {
      await update_guest(
        seat_id,
        guestName,
        foodChoice,
        allergies,
        association,
        associationGrouping
      );
      setSnackbarSeverity("success");
      setSnackbarMessage("Guest information updated successfully!");
      setSnackbarOpen(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unknown error occurred.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const [guestName, setGuestName] = useState<string | null | undefined>(null);
  const [foodChoice, setFoodChoice] = useState<string | null | undefined>(null);
  const [allergies, setallergies] = useState<string | null | undefined>(null);
  const [association, setAssociation] = useState<string | null | undefined>(
    null
  );
  const [associationGrouping, setAssociationGrouping] = useState<
    string | null | undefined
  >(null);

  const { seat_selected } = useContext(seat_selected_context);

  if (error) return <div>Error: {error}</div>;
  if (!guest) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        boxSizing: "border-box",
      }}
    >
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
      <Grid
        container
        spacing={1}
        sx={{ width: "100%", height: "100%", justifyContent: "center" }}
      >
        <Grid size={12}>
          <Typography variant='subtitle2'>
            Seat Selected: {seat_selected}
          </Typography>
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label='Guest Name'
            value={guestName ?? ""}
            onChange={(e) => setGuestName(e.target.value)}
            slotProps={{
              inputLabel: { sx: { fontSize: 12 } },
              input: { sx: { fontSize: 10 } },
            }}
            size='small'
          />
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth size='small'>
            <InputLabel sx={{ fontSize: 12 }}>Food Choice</InputLabel>
            <Select
              value={foodChoice ?? ""}
              label='Food Choice'
              onChange={(e) => setFoodChoice(e.target.value)}
              slotProps={{
                input: { sx: { fontSize: 10 } },
              }}
              sx={{ fontSize: 10 }}
            >
              <MenuItem value='Chicken'>Chicken</MenuItem>
              <MenuItem value='Beef'>Beef</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label='Food Allergies'
            value={allergies ?? ""}
            onChange={(e) => setallergies(e.target.value)}
            slotProps={{
              inputLabel: { sx: { fontSize: 12 } },
              input: { sx: { fontSize: 10 } },
            }}
            size='small'
          />
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth size='small'>
            <InputLabel sx={{ fontSize: 12 }}>Association</InputLabel>
            <Select
              value={association ?? ""}
              label='Association'
              onChange={(e) =>
                setAssociation(e.target.value as "bride" | "groom")
              }
              slotProps={{
                input: { sx: { fontSize: 10 } },
              }}
              sx={{ fontSize: 10 }}
            >
              <MenuItem value='bride'>Bride</MenuItem>
              <MenuItem value='groom'>Groom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label='Association Grouping'
            value={associationGrouping ?? ""}
            onChange={(e) => setAssociationGrouping(e.target.value)}
            slotProps={{
              inputLabel: { sx: { fontSize: 12 } },
              input: { sx: { fontSize: 10 } },
            }}
            size='small'
          />
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={6}>
            <Button
              variant='outlined'
              fullWidth
              onClick={clearAllFields}
              size='small'
              sx={{ fontSize: 10, py: 1 }}
            >
              Clear guest details
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              variant='contained'
              fullWidth
              onClick={handleUpdateGuest}
              size='small'
              sx={{ fontSize: 10, py: 1 }}
            >
              Update Details
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Guest_Form;
