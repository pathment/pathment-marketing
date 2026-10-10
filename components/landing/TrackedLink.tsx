"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type MarketingEvent } from "../../lib/analytics";

type Props = ComponentProps<typeof Link> & {
  eventName: MarketingEvent;
  eventProperties?: Record<string, string | number | boolean>;
};

export function TrackedLink({ eventName, eventProperties, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, eventProperties);
        onClick?.(event);
      }}
    />
  );
}
