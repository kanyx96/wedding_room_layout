"use client";

import { useContext } from "react";
import styles from "./table_styles.module.css";
import { Box, Grid, Typography } from "@mui/material";
import { seat_selected_context } from "@/contexts/seat_selection_contexts";

export function Horizontal_Table({
  size,
  identifier,
}: {
  size: number;
  identifier: string;
}) {
  const { seat_selected, set_seat_selected } = useContext(
    seat_selected_context
  );

  const arr = [...Array(size).keys()];
  return (
    <Grid container className={styles.base_container}>
      {/* first set of chairs */}
      {arr.slice(0, arr.length / 2).map((value, index) => (
        <Grid
          size={(12 / size) * 2}
          key={index}
          alignContent="center"
          justifyItems="center"
          sx={{ height: "25%" }}
        >
          <Box
            className={styles.chair}
            sx={{
              height: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
              backgroundColor:
                seat_selected === identifier + (value + 1) ? "red" : null,
            }}
            onClick={() => set_seat_selected(identifier + (value + 1))}
          />
        </Grid>
      ))}

      {/* table */}
      <Grid
        size={12}
        sx={{ height: "50%" }}
        alignContent="center"
        justifyItems="center"
      >
        <Box
          sx={{
            height: "80%",
            width: "95%",
            borderWidth: 2,
            borderColor: "gray",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "50%" }}>
            {identifier}
          </Typography>
        </Box>
      </Grid>

      {/* second set of chairs */}
      {arr.slice(arr.length / 2, arr.length).map((value, index) => (
        <Grid
          size={(12 / size) * 2}
          key={index}
          alignContent="center"
          justifyItems="center"
          sx={{ height: "25%" }}
        >
          <Box
            className={styles.chair}
            sx={{
              height: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
              backgroundColor:
                seat_selected === identifier + (value + 1) ? "red" : null,
            }}
            onClick={() => set_seat_selected(identifier + (value + 1))}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export function Verticle_Table({
  size,
  identifier,
}: {
  size: number;
  identifier: string;
}) {
  const { seat_selected, set_seat_selected } = useContext(
    seat_selected_context
  );

  const arr = [...Array(size).keys()];
  return (
    <div className={styles.verticle_base_container}>
      {/* first set of chairs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          width: "25%",
          height: "100%",
        }}
      >
        {arr.slice(0, arr.length / 2).map((value, index) => (
          <Box
            key={index}
            className={styles.chair}
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
              backgroundColor:
                seat_selected === identifier + (value + 1) ? "red" : null,
            }}
            onClick={() => set_seat_selected(identifier + (value + 1))}
          />
        ))}
      </div>

      {/* table */}
      <div
        style={{ width: "50%", alignContent: "center", justifyItems: "center" }}
      >
        <Box
          sx={{
            height: "95%",
            width: "80%",
            borderWidth: 2,
            borderColor: "gray",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "50%" }}>
            {identifier}
          </Typography>
        </Box>
      </div>

      {/* second set of chairs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          width: "25%",
          height: "100%",
        }}
      >
        {arr.slice(arr.length / 2, arr.length).map((value, index) => (
          <Box
            key={index}
            className={styles.chair}
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
              backgroundColor:
                seat_selected === identifier + (value + 1) ? "red" : null,
            }}
            onClick={() => set_seat_selected(identifier + (value + 1))}
          />
        ))}
      </div>
    </div>
  );
}
