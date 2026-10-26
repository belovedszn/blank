import type { SVGProps } from "react";
const base = (p: SVGProps<SVGSVGElement>) => ({ width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p });

export const IconSaaS = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>);
export const IconCoop = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="8" cy="9" r="3" /><circle cx="17" cy="10" r="2.4" /><path d="M2.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.600 5.500 4.600M14.500 15.200c.9-.4 1.800-.6 2.600-.6 2 0 3.700 1.200 4.400 4" /></svg>);
export const IconSchool = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.500V16c0 1.500 2.700 3 6 3s6-1.500 6-3v-4.500" /></svg>);
export const IconStream = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9.500v5l4.500-2.500z" /></svg>);
export const IconHome = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-6h4v6" /></svg>);
export const IconCheck = (p: SVGProps<SVGSVGElement>) => (<svg {...base({ width: 18, height: 18, ...p })}><path d="M5 12.500l4.500 4.500L19 7" /></svg>);
export const IconCopy = (p: SVGProps<SVGSVGElement>) => (<svg {...base({ width: 16, height: 16, ...p })}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 012-2h9" /></svg>);
export const IconPlus = (p: SVGProps<SVGSVGElement>) => (<svg {...base({ width: 20, height: 20, ...p })}><path d="M12 5v14M5 12h14" /></svg>);
export const IconClose = (p: SVGProps<SVGSVGElement>) => (<svg {...base({ width: 22, height: 22, ...p })}><path d="M6 6l12 12M18 6L6 18" /></svg>);
