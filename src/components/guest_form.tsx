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
  CircularProgress,
} from "@mui/material";
import { seat_selected_context } from "@/contexts/seat_selection_contexts";
import { Guest } from "@/models/guest_model";
import { update_guest } from "./functions/update_guest_function";

const Guest_Form = ({ seat_id }: { seat_id: string }) => {
  const [loading, setLoading] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/guests/fetch_guest_details?seat_id=${seat_id}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setGuest(data);
      setGuestName(data.guest_name);
      setFoodChoice(data.food_choice);
      setAllergies(data.allergies);
      setAssociation(data.association);
      setAssociationGrouping(data.association_grouping);
      setLoading(false);
    };

    fetchGuest();
  }, [seat_id]);

  const clearAllFields = async () => {
    try {
      await update_guest(seat_id, null, null, null, null, null);
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

    setGuestName(null);
    setFoodChoice(null);
    setAllergies(null);
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
  const [allergies, setAllergies] = useState<string | null | undefined>(null);
  const [association, setAssociation] = useState<string | null | undefined>(
    null
  );
  const [associationGrouping, setAssociationGrouping] = useState<
    string | null | undefined
  >(null);

  const { seat_selected } = useContext(seat_selected_context);

  if (error)
    return (
      <Typography variant="h6" sx={{ paddingLeft: 3 }}>
        Error: {error}
      </Typography>
    );
  if (loading || !guest) return <CircularProgress sx={{ paddingLeft: 3 }} />;

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
          <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
            Seat Selected: {seat_selected}
          </Typography>
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label="Guest Name"
            value={guestName ?? ""}
            onChange={(e) => setGuestName(e.target.value)}
            slotProps={{
              inputLabel: { sx: { fontSize: 16 } },
              input: { sx: { fontSize: 14 } },
            }}
            size="medium"
          />
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth size="medium">
            <InputLabel sx={{ fontSize: 16 }}>Food Choice</InputLabel>
            <Select
              value={foodChoice ?? ""}
              label="Food Choice"
              onChange={(e) => setFoodChoice(e.target.value)}
              slotProps={{
                input: { sx: { fontSize: 14 } },
              }}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="Chicken">Chicken</MenuItem>
              <MenuItem value="Beef">Beef</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Food Allergies"
            value={allergies ?? ""}
            onChange={(e) => setAllergies(e.target.value)}
            slotProps={{
              inputLabel: { sx: { fontSize: 16 } },
              input: { sx: { fontSize: 14 } },
            }}
            size="medium"
          />
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth size="medium">
            <InputLabel sx={{ fontSize: 16 }}>Association</InputLabel>
            <Select
              value={association ?? ""}
              label="Association"
              onChange={(e) =>
                setAssociation(e.target.value as "bride" | "groom")
              }
              slotProps={{
                input: { sx: { fontSize: 14 } },
              }}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="bride">Bride</MenuItem>
              <MenuItem value="groom">Groom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Association Grouping"
            value={associationGrouping ?? ""}
            onChange={(e) => setAssociationGrouping(e.target.value)}
            slotProps={{
              inputLabel: { sx: { fontSize: 16 } },
              input: { sx: { fontSize: 14 } },
            }}
            size="medium"
          />
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={clearAllFields}
              size="medium"
              sx={{ fontSize: 14, py: 1 }}
            >
              Clear guest details
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdateGuest}
              size="medium"
              sx={{ fontSize: 14, py: 1 }}
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
