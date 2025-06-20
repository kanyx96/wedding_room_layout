"use client";

import styles from "./styles.module.css";
import { Box, Grid, Typography } from "@mui/material";

export function Horizontal_Table({
  size,
  identifier,
}: {
  size: number;
  identifier: string;
}) {
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
            sx={{
              height: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
            }}
            onClick={() => alert(identifier + value)}
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
          <Typography variant="body1" sx={{fontSize: "50%"}}>{identifier}</Typography>
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
            sx={{
              height: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
            }}
            onClick={() => alert(identifier + value)}
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
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
            }}
            onClick={() => alert(identifier + value)}
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
          <Typography variant="body1" sx={{fontSize: "50%"}}>{identifier}</Typography>
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
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
            }}
            onClick={() => alert(identifier + value)}
          />
        ))}
      </div>
    </div>
  );
}
