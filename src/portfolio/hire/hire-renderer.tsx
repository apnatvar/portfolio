"use client";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { HireAP } from "@/components/hire";
import { ThemedMenu } from "@/components/themed-menu";
import { CreativeHire } from "./creative-hire";

export function HireRenderer() {
  const { mode } = useDisplayMode();

  if (mode === "creative") return <CreativeHire />;

  return (
    <>
      <ThemedMenu />
      <HireAP landing={false} presentation={mode} />
    </>
  );
}
