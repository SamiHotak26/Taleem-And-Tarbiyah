import type { CSSProperties, ReactNode } from "react";

/**
 * Decorations inspired by the tile work of the Great Mosque of Herat:
 * an eight-pointed star tile pattern, a thin tile strip, and a
 * pointed-arch card. Everything is drawn in code (no photos).
 */

const COBALT = "#1E4E9C";
const TURQUOISE = "#2BB3C0";
const WHITE = "#FFFFFF";
const GOLD = "#F2B33D";

function star(cx: number, cy: number, r: number, fill: string) {
  // Two overlapping squares = eight-pointed star (khatam)
  const s = r * Math.SQRT1_2;
  return (
    `<rect x="${cx - s}" y="${cy - s}" width="${2 * s}" height="${2 * s}" fill="${fill}"/>` +
    `<rect x="${cx - s}" y="${cy - s}" width="${2 * s}" height="${2 * s}" fill="${fill}" transform="rotate(45 ${cx} ${cy})"/>`
  );
}

const tileSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">` +
  `<rect width="40" height="40" fill="${COBALT}"/>` +
  star(20, 20, 13, TURQUOISE) +
  star(20, 20, 7, WHITE) +
  `<circle cx="20" cy="20" r="2.5" fill="${GOLD}"/>` +
  `<path d="M0 0 L5 0 L0 5 Z M40 0 L35 0 L40 5 Z M0 40 L5 40 L0 35 Z M40 40 L35 40 L40 35 Z" fill="${GOLD}"/>` +
  `</svg>`;

export const heratTile = `url("data:image/svg+xml,${encodeURIComponent(tileSvg)}")`;

/** Thin decorative band of tiles. */
export function TileStrip({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-3 w-full ${className}`}
      style={{ backgroundImage: heratTile, backgroundSize: "12px 12px" }}
    />
  );
}

/** Faint tile pattern to place behind content (parent needs `relative`). */
export function TileBackground({ opacity = 0.12 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: heratTile, backgroundSize: "48px 48px", opacity }}
    />
  );
}

/** Shape of one half of the arch: [across, up] from the foot (0,0) to the apex (1,1). */
const ARCH_CURVE: [number, number][] = [
  [0, 0], [0.01, 0.12], [0.03, 0.24], [0.07, 0.36], [0.12, 0.46], [0.19, 0.55],
  [0.28, 0.63], [0.4, 0.71], [0.55, 0.79], [0.7, 0.86], [0.85, 0.93], [1, 1],
];

/** clip-path for a pointed (Timurid-style) arch whose top is `archHeight` px tall. */
function archClip(archHeight: number): string {
  const left: string[] = [];
  const right: string[] = [];
  for (const [u, v] of ARCH_CURVE) {
    const x = 50 * u;
    const y = archHeight * (1 - v);
    left.push(`${x.toFixed(2)}% ${y.toFixed(1)}px`);
    right.unshift(`${(100 - x).toFixed(2)}% ${y.toFixed(1)}px`);
  }
  right.shift(); // apex is already in the left list
  return `polygon(0% 100%, ${left.join(", ")}, ${right.join(", ")}, 100% 100%)`;
}

const outerClip = archClip(110);
const innerClip = archClip(100);

/** A card shaped like a tiled mosque doorway (iwan). */
export function ArchCard({ children }: { children: ReactNode }) {
  const outer: CSSProperties = {
    backgroundImage: heratTile,
    backgroundSize: "20px 20px",
    clipPath: outerClip,
  };
  const inner: CSSProperties = { clipPath: innerClip };
  return (
    <div className="mx-auto h-full w-full max-w-sm rounded-b-3xl p-2.5" style={outer}>
      <div
        className="flex h-full flex-col items-center justify-center rounded-b-2xl bg-white px-5 pb-7 pt-24 text-center"
        style={inner}
      >
        {children}
      </div>
    </div>
  );
}
