import { ImageResponse } from "next/og";
export const alt = "AP — Technical SEO, engineered for Next.js. India-based, remote worldwide.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ background: "#efe4d0", color: "#382d25", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>AP / APNATVA.DEV</span><span>India · Remote worldwide</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 76, letterSpacing: -4, lineHeight: 1.08 }}><span>Technical SEO,</span><span>engineered for Next.js.</span></div><div style={{ fontSize: 24 }}>TypeScript · Programmatic SEO · Automation · Performance</div></div>, size);
}
