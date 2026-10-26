"use client";
import Image from "next/image";
import { Component, type ReactNode } from "react";

/** Static fallback: the supplied bridge illustration. */
export function BridgeFallback() {
  return (
    <Image src="/lagos-bridge.png" alt="" fill priority sizes="100vw" className="object-cover object-[50%_62%]" aria-hidden />
  );
}

/** Catches renderer crashes (context loss, shader failure) and swaps in the still image. */
export default class BridgeSceneBoundary extends Component<{ children: ReactNode; onError?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError?.(); }
  render() { return this.state.failed ? <BridgeFallback /> : this.props.children; }
}
