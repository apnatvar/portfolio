"use client";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { CreativeHire } from "./creative-hire";

export function HireRenderer() {
  const { mode } = useDisplayMode();

  return <CreativeHire mode={mode} />;
}
