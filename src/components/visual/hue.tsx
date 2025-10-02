// components/hue/HueContext.tsx
"use client";

import * as React from "react";

type HueContextValue = {
  hue: number; // 0–300
  setHue: (h: number) => void;
};

const HueContext = React.createContext<HueContextValue | null>(null);

export function HueProvider({ children }: { children: React.ReactNode }) {
  const [hue, setHue] = React.useState<number>(0);
  const value = React.useMemo(() => ({ hue, setHue }), [hue]);
  return <HueContext.Provider value={value}>{children}</HueContext.Provider>;
}

export function useHue(): HueContextValue {
  const ctx = React.useContext(HueContext);
  if (!ctx) throw new Error("useHue must be used within <HueProvider>");
  return ctx;
}
