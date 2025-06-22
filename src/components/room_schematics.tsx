import { Horizontal_Table, Verticle_Table } from "./table";
import { Typography } from "@mui/material";

export default function Room_Schematic() {
  return (
      <div
        style={{
          // height: "80%",
          width: "50%",
          aspectRatio: "1 / 0.75",
          borderColor: "gray",
          borderWidth: "2px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* left side of the room */}
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            paddingTop: "3%",
          }}
        >
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={14} identifier="A" />
          </div>
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={12} identifier="B" />
          </div>
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={12} identifier="C" />
          </div>
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={14} identifier="D" />
          </div>
        </div>

        {/* middle of room */}
        <div
          style={{
            marginLeft: "5.37%",
            marginRight: " 5.37%",
            width: "40.18%",
            height: "100%",
          }}
        >
          {/* stage */}
          <div
            style={{
              height: "15.6%",
              aspectRatio: "2.5 / 1",
              borderColor: "gray",
              borderWidth: "2px",
              alignContent: "center",
              justifyItems: "center",
              justifySelf: "center",
            }}
          >
            <Typography variant="body1">Stage</Typography>
          </div>

          {/* open area and seats to left and right */}
          <div
            style={{
              height: "48.3%",
              width: "100%",
              marginTop: "7.81%",
              marginBottom: "9%",
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            {/* left side seats of open area */}
            <div style={{ width: "30%" }}>
              <div
                style={{
                  height: "41.7%",
                  aspectRatio: "0.85 / 1.29",
                  marginBottom: "20%",
                }}
              >
                <Verticle_Table size={10} identifier="E" />
              </div>
              <div
                style={{
                  height: "41.7%",
                  aspectRatio: "0.85 / 1.29",
                }}
              >
                <Verticle_Table size={10} identifier="F" />
              </div>
            </div>
            {/* open area */}
            <div
              style={{
                width: "50%",
                aspectRatio: "1.4 / 2.36",
                borderColor: "gray",
                borderWidth: "2px",
                marginTop: "12.94%",
                marginLeft: "2.5%",
                marginRight: "2.5%",
              }}
            />
            {/* right side seats of open area */}
            <div style={{ width: "30%" }}>
              <div
                style={{
                  height: "41.7%",
                  aspectRatio: "0.85 / 1.29",
                  marginBottom: "20%",
                }}
              >
                <Verticle_Table size={10} identifier="G" />
              </div>
              <div
                style={{
                  height: "41.7%",
                  aspectRatio: "0.85 / 1.29",
                }}
              >
                <Verticle_Table size={10} identifier="H" />
              </div>
            </div>
          </div>
          {/* bottom middle tables */}
          <div
            style={{
              height: "13.28%",
              aspectRatio: "3 / 0.85",
              justifySelf: "center",
            }}
          >
            <Horizontal_Table size={22} identifier="J" />
          </div>
        </div>

        {/* right side of the room */}
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            paddingTop: "3%",
          }}
        >
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={14} identifier="K" />
          </div>
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={12} identifier="L" />
          </div>
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={12} identifier="M" />
          </div>
          <div
            style={{
              height: "15.6%",
              aspectRatio: "1 / 0.5",
            }}
          >
            <Horizontal_Table size={14} identifier="N" />
          </div>
        </div>
      </div>
  );
}
