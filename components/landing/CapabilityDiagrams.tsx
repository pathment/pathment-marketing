/**
 * Abstract line diagrams, one per capability.
 *
 * Pathment has no photography and no illustration budget, which is the same
 * constraint Linear works under. The answer there is the same as here: a small
 * geometric drawing that states the mechanism, in a single shared visual
 * language, instead of a generic icon dropped in a rounded box.
 *
 * House rules for anything added later: a 120x84 viewBox, 1px strokes in
 * `currentColor` so the drawing inherits the surrounding text colour, round
 * caps and joins, and exactly one element promoted to mint as the focal point.
 */
const COMMON = {
  viewBox: "0 0 120 84",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  /* Height-driven so the drawing keeps its 120:84 ratio and never outgrows
     its row. Width-driven scaling let it overflow into the heading below. */
  className: "h-full w-auto",
};

const MINT = "var(--mint)";

/** Many applicants narrowing to one placed cohort. */
function Intake() {
  return (
    <svg {...COMMON}>
      {[14, 26, 38, 50, 62].map((y, i) => (
        <line key={y} x1="6" y1={y} x2={30 + i * 3} y2={y} opacity={0.45} />
      ))}
      <path d="M44 14 L74 34 L74 50 L44 70" opacity={0.5} />
      <line x1="74" y1="42" x2="104" y2="42" stroke={MINT} />
      <circle cx="108" cy="42" r="4" stroke={MINT} />
    </svg>
  );
}

/** A goal broken into milestones, one of them reached. */
function Roadmap() {
  return (
    <svg {...COMMON}>
      <path d="M10 66 L36 66 L36 46 L68 46 L68 26 L104 26" opacity={0.5} />
      <circle cx="10" cy="66" r="3.5" opacity={0.5} />
      <circle cx="36" cy="46" r="3.5" opacity={0.5} />
      <circle cx="68" cy="26" r="5" stroke={MINT} />
      <circle cx="68" cy="26" r="1.8" fill={MINT} stroke="none" />
      <circle cx="104" cy="26" r="3.5" opacity={0.3} />
    </svg>
  );
}

/** A submission, then the review stacked on top of it. */
function Review() {
  return (
    <svg {...COMMON}>
      <rect x="10" y="26" width="58" height="40" rx="4" opacity={0.4} />
      <line x1="20" y1="40" x2="48" y2="40" opacity={0.35} />
      <line x1="20" y1="50" x2="40" y2="50" opacity={0.35} />
      <rect x="46" y="14" width="62" height="40" rx="4" stroke={MINT} />
      <path d="M60 34 L68 42 L84 26" stroke={MINT} strokeWidth={1.4} />
    </svg>
  );
}

/** Progress interrupted, then routed around. */
function Roadblock() {
  return (
    <svg {...COMMON}>
      <line x1="8" y1="54" x2="50" y2="54" opacity={0.5} />
      <line x1="56" y1="22" x2="56" y2="66" stroke={MINT} />
      <path d="M56 22 L74 28 L56 34" stroke={MINT} />
      <path d="M50 54 C 62 54, 62 42, 74 42 L 110 42" opacity={0.5} strokeDasharray="3 3" />
      <circle cx="114" cy="42" r="3" opacity={0.4} />
    </svg>
  );
}

/** Work accumulating into something awarded. */
function Recognition() {
  return (
    <svg {...COMMON}>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={12 + i * 18}
          y={58 - i * 10}
          width="12"
          height={8 + i * 10}
          rx="2"
          opacity={0.4}
        />
      ))}
      <circle cx="86" cy="36" r="15" stroke={MINT} />
      <path d="M86 28 L89 34 L95 35 L90 40 L92 46 L86 43 L80 46 L82 40 L77 35 L83 34 Z" stroke={MINT} strokeWidth={0.9} />
    </svg>
  );
}

/** Open availability with one slot taken. */
function Schedule() {
  return (
    <svg {...COMMON}>
      <rect x="10" y="16" width="100" height="52" rx="4" opacity={0.35} />
      <line x1="10" y1="30" x2="110" y2="30" opacity={0.35} />
      {[34, 58, 82].map((x) => (
        <line key={x} x1={x} y1="16" x2={x} y2="68" opacity={0.2} />
      ))}
      <rect x="36" y="34" width="20" height="14" rx="2" fill={MINT} opacity={0.18} stroke="none" />
      <rect x="36" y="34" width="20" height="14" rx="2" stroke={MINT} />
    </svg>
  );
}

/** A clan: a lead with a circle of people around them. */
function Community() {
  return (
    <svg {...COMMON}>
      <circle cx="60" cy="42" r="7" stroke={MINT} />
      {[
        [22, 22],
        [98, 22],
        [22, 62],
        [98, 62],
        [60, 12],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <line x1="60" y1="42" x2={cx} y2={cy} opacity={0.22} />
          <circle cx={cx} cy={cy} r="5" opacity={0.5} />
        </g>
      ))}
    </svg>
  );
}

/** The completion distribution, which is the view that drives the week. */
function Insights() {
  const bars = [14, 30, 46, 24, 10];
  return (
    <svg {...COMMON}>
      <line x1="10" y1="70" x2="110" y2="70" opacity={0.35} />
      {bars.map((h, i) => {
        const peak = h === Math.max(...bars);
        return (
          <rect
            key={i}
            x={16 + i * 19}
            y={70 - h}
            width="12"
            height={h}
            rx="2"
            stroke={peak ? MINT : "currentColor"}
            opacity={peak ? 1 : 0.4}
          />
        );
      })}
    </svg>
  );
}

export const capabilityDiagrams: Record<string, () => React.JSX.Element> = {
  "clipboard-list": Intake,
  route: Roadmap,
  "clipboard-check": Review,
  flag: Roadblock,
  trophy: Recognition,
  calendar: Schedule,
  "message-square": Community,
  "bar-chart-3": Insights,
};
