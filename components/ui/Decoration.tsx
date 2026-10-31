"use client";

import { ZeenatScene } from "zeenat";
import { petals } from "zeenat/effects/petals";

const effects = [petals()];

export function Decoration() {
  return <ZeenatScene effects={effects} zIndex={40} />;
}
