import { servicePages } from "@/content/service-pages";
import { guides } from "@/content/writing";
export const indexablePaths = ["/", "/front-end", "/seo", "/about-ap", "/hire-ap", "/work", "/services", ...servicePages.map(s => `/services/${s.slug}`), "/writing", ...guides.map(g => `/writing/${g.slug}`), "/tools", "/tools/metadata-checker", "/tools/developer-focus-planner", "/tools/decision-confidence-calculator", "/ideals", "/links", "/portable-context"];
