"use client";
import "@/lib/wasm";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRive } from "@rive-app/react-canvas";
import { useReducedMotion } from "@/lib/hooks";

export type Media = { kind: "lottie" | "rive"; src: string; label: string; animation?: string };

function RiveMedia({ src, play, animation }: { src: string; play: boolean; animation?: string }) {
  const { RiveComponent } = useRive({ src, autoplay: play, ...(animation ? { animations: animation } : {}) });
  return <RiveComponent />;
}

/** The only place third-party animation APIs are touched. Cards stay declarative. */
export default function CardMedia({ media }: { media: Media }) {
  const reduce = useReducedMotion();
  return (
    <div role="img" aria-label={media.label} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-bone/5">
      {media.kind === "lottie"
        ? <DotLottieReact src={media.src} loop autoplay={!reduce} />
        : <RiveMedia src={media.src} play={!reduce} animation={media.animation} />}
    </div>
  );
}
