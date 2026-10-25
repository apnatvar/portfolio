import { machineOverview } from "@/lib/machine-overview";
import { portfolioContent } from "@/content/portfolio-content";
export function GET() {
  const projects = portfolioContent.projects.map(p => `## ${p.title}\n${p.points.join("\n")}\n${p.links.map(l => `- [${l.label}](${l.href})`).join("\n")}`).join("\n\n");
  return new Response(`${machineOverview()}\n# Project implementation notes\n\n${projects}`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
