import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#03040a",
          padding: "80px",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: 28,
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, display: "flex", flexDirection: "column" }}>
          <span>Muhamad Ramdhani</span>
          <span>Fathul Muttaqin</span>
        </div>
        <div style={{ fontSize: 26, opacity: 0.5, marginTop: 28 }}>
          Backend & Full-Stack Developer
        </div>
      </div>
    ),
    { ...size }
  );
}