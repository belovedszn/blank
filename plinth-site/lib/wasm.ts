import { RuntimeLoader } from "@rive-app/canvas";
import { setWasmUrl } from "@lottiefiles/dotlottie-react";

/**
 * Both animation runtimes fetch WASM from public CDNs by default. Serve it from our own origin
 * instead, so the strict CSP holds and the site works if a CDN is blocked or slow.
 * Importing this module (side effect) is enough; it is idempotent.
 */
RuntimeLoader.setWasmUrl("/wasm/rive.wasm");
setWasmUrl("/wasm/dotlottie-player.wasm");

export {};
