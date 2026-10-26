import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Plinth — the base your billing stands on";
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0A0A0A", color: "#FAFAFA", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72 }}>
        <div style={{ fontSize: 34, color: "#0FA37F", fontWeight: 700 }}>Plinth</div>
        <div style={{ fontSize: 108, fontWeight: 800, lineHeight: 1, letterSpacing: -3, display: "flex", flexDirection: "column" }}>
          <span>The base your</span><span>billing stands on.</span>
        </div>
        <div style={{ fontSize: 30, color: "#A3A3A3" }}>Recurring billing & reconciliation, built for how Nigeria actually pays.</div>
      </div>
    ),
    size,
  );
}
