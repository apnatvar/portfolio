import { machineOverview } from "@/lib/machine-overview";
export function GET() { return new Response(machineOverview(), { headers: { "content-type": "text/plain; charset=utf-8" } }); }
