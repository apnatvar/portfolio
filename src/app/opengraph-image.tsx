import { ImageResponse } from "next/og";
export const alt = "AP — A little particular. Front-end development, design, and technical SEO by Apnatva Singh Rawat.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ background: "#e8d8b7", color: "#352619", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}><span>AP / APNATVA.DEV</span><span>Front-end developer & designer</span></div><div style={{ display: "flex", flexDirection: "column", fontFamily: "serif", fontStyle: "italic", fontSize: 110, lineHeight: 1.08 }}><span>A little</span><span>particular.</span></div><div style={{ fontSize: 20 }}>React / Next.js / TypeScript / Technical SEO</div></div>, size);
}
