"use client";

import { Button } from "@/components/ui/button";
import { Copy, Download, FileJson, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ExportActionsProps = {
  disabled?: boolean;
  markdown: string;
  json: string;
  plainText: string;
  filename: string;
};

function downloadFile(contents: string, filename: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function ExportActions({
  disabled = false,
  markdown,
  json,
  plainText,
  filename,
}: ExportActionsProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (resetTimer.current) clearTimeout(resetTimer.current); }, []);

  async function copyResult() {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyError("Clipboard access is unavailable. Download Markdown or JSON to save your result.");
    }
  }

  return (
    <div className="tool-controls flex flex-wrap gap-2" aria-label="Export result">
      <Button type="button" variant="outline" disabled={disabled} onClick={() => window.print()}>
        <Printer aria-hidden="true" /> Print / PDF
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => downloadFile(markdown, `${filename}.md`, "text/markdown;charset=utf-8")}
      >
        <Download aria-hidden="true" /> Markdown
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => downloadFile(json, `${filename}.json`, "application/json;charset=utf-8")}
      >
        <FileJson aria-hidden="true" /> JSON
      </Button>
      <Button type="button" variant="outline" disabled={disabled} onClick={copyResult}>
        <Copy aria-hidden="true" /> {copied ? "Copied" : "Copy text"}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Result copied to clipboard" : ""}
      </span>
      {copyError ? <p role="status" className="w-full text-sm">{copyError}</p> : null}
    </div>
  );
}
