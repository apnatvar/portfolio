"use client";

import * as React from "react";

export default function FooterNote() {
  return (
    <footer className="mt-10 text-center w-full mx-auto p-4">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} AP — All rights reserved.
      </p>
    </footer>
  );
}
