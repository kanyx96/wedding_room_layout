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
} from "@mui/material";
import { seat_selected_context } from "@/contexts/seat_selection_contexts";
import { Guest } from "@/models/guest_model";

const Guest_Form = ({
  seat_id,
  onChangeSeat,
  // onUpdateDetails,
}: {
  seat_id: string;
  onChangeSeat?: () => void;
  // onUpdateDetails?: (data: {
  //   guest_name: string;
  //   food_choice: string;
  //   food_allergies: string;
  //   association: "bride" | "groom";
  //   association_grouping: string;
  // }) => void;
}) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      const res = await fetch("/api/guests?seat_id=" + seat_id);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setGuest(data);
    };

    fetchGuest();
  }, [seat_id]);

  const [guestName, setGuestName] = useState(guest?.guest_name);
  const [foodChoice, setFoodChoice] = useState(guest?.food_choice);
  const [foodAllergies, setFoodAllergies] = useState(guest?.food_allergies);
  const [association, setAssociation] = useState(guest?.association);
  const [associationGrouping, setAssociationGrouping] = useState(
    guest?.association_grouping
  );

  const handleUpdate = () => {
    // onUpdateDetails?.({
    //   guest_name: guestName,
    //   food_choice: foodChoice,
    //   food_allergies: foodAllergies,
    //   association,
    //   association_grouping: associationGrouping,
    // });
  };

  const { seat_selected } = useContext(seat_selected_context);

  if (error) return <div>Error: {error}</div>;
  if (!guest) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        boxSizing: "border-box",
      }}
    >
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
            value={guestName}
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
              value={foodChoice}
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
            value={foodAllergies}
            onChange={(e) => setFoodAllergies(e.target.value)}
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
              value={association}
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
            value={associationGrouping}
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
              onClick={onChangeSeat}
              size='small'
              sx={{ fontSize: 10, py: 1 }}
            >
              Change Guest&apos;s Seat
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              variant='contained'
              fullWidth
              onClick={handleUpdate}
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
