"use client";

import { ArrowRight, X } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { useSyncExternalStore } from "react";
import { track } from "../../lib/analytics";
import { ANDROID_APP_URL } from "../../lib/links";

// v2: the public Google Play launch. Visitors who dismissed the earlier
// notice still get to hear about it once.
const STORAGE_KEY = "pathment-announcement-dismissed-v2";

/**
 * Read as an external store rather than with state-in-an-effect: the server
 * renders nothing, and the client reveals the bar on hydration only if this
 * visitor has not dismissed it before.
 */
const listeners = new Set<() => void>();
let dismissedThisSession = false;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function isDismissed() {
  if (dismissedThisSession) return true;
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Private mode or blocked storage: show the bar, it is dismissible anyway.
    return false;
  }
}

/** Hidden during SSR so the markup matches the first client paint. */
function isDismissedOnServer() {
  return true;
}

function dismiss() {
  dismissedThisSession = true;
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* The bar simply returns next visit. */
  }
  listeners.forEach((listener) => listener());
}

export function AnnouncementBar() {
  const hidden = useSyncExternalStore(
    subscribe,
    isDismissed,
    isDismissedOnServer,
  );

  if (hidden) return null;

  return (
    <div className="on-band-deep relative z-[60]">
      <div className="shell flex items-center justify-center gap-3 py-2.5 pr-10 text-center sm:pr-12">
        <p className="text-[13px] leading-5 text-band-ink/85">
          <span className="mr-2 hidden items-center gap-1.5 rounded-full bg-mint/15 px-2 py-0.5 align-[1px] font-mono text-[10px] uppercase tracking-[0.14em] text-mint sm:inline-flex">
            <FaGooglePlay className="h-2.5 w-2.5" aria-hidden />
            Now on Google Play
          </span>
          <span className="sm:hidden">Pathment is now on Android.</span>
          <span className="hidden sm:inline">
            Approve, review and reply from your phone with the Pathment
            Android app.
          </span>
          <a
            href={ANDROID_APP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("android_app_clicked", { source: "announcement" })}
            className="group ml-2 inline-flex items-center gap-1 font-semibold text-mint-bright underline-offset-4 hover:underline"
          >
            Get the app
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-band-ink/55 hover:bg-white/10 hover:text-band-ink sm:right-5"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
