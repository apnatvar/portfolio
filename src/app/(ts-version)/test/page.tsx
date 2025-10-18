"use client";
import "@/app/visual.css";
import FlowingGallery, { FlowImage } from "@/components/visual/photo-gallery-2";

const MOCK: FlowImage[] = [
  {
    id: "1",
    src: "/mountain.svg",
    alt: "Emerald sari",
    href: "https://example.com/a",
    aspect: 4 / 5,
  },
  { id: "2", src: "/mountain.svg", alt: "Crimson lehenga", aspect: 3 / 4 },
  { id: "3", src: "/mountain.svg", alt: "Portrait" },
  { id: "4", src: "/mountain.svg", alt: "Street" },
  { id: "5", src: "/mountain.svg", alt: "Mountains", aspect: 16 / 10 },
  { id: "6", src: "/mountain.svg", alt: "Studio" },
  { id: "7", src: "/mountain.svg", alt: "City lights" },
  { id: "8", src: "/mountain.svg", alt: "Textures" },
  { id: "9", src: "/mountain.svg", alt: "Candid" },
  { id: "10", src: "/ap-icon.svg", alt: "Editorial" },
];
export default function FuturePlans() {
  return (
    <>
      <div className="h-dvh bg-green-400" />
      <FlowingGallery images={MOCK} />{" "}
      <div className="h-[100dvh] bg-green-400" />
    </>
  );
}
