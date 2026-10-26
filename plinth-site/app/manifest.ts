import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plinth", short_name: "Plinth",
    description: "Recurring billing and reconciliation for Nigeria.",
    start_url: "/", display: "standalone", background_color: "#0A0A0A", theme_color: "#0A0A0A",
    icons: [{ src: "/plinth-logo.png", sizes: "2400x2400", type: "image/png" }],
  };
}
