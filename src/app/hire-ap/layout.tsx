import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Say hello", "Have a website, a small tool, or an idea you want to talk through? Leave AP a note.", "/hire-ap");
export default function HireAPLayout({ children }: { children: ReactNode }) { return <>{children}</>; }
