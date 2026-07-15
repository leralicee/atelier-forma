export type Season = 'JUN' | 'SEP' | 'DEC';

export const SEASONS: Season[] = ['JUN', 'SEP', 'DEC'];

export interface HeliodonState {
  day: number;
  dayTarget: number;
  season: Season;
  ink: number;
  build: number;
  sunrise: number;
  dusk: number;
  lapse: boolean;
  lastInput: number;
}

export function createHeliodonState(): HeliodonState {
  return {
    day: 0.36,
    dayTarget: 0.36,
    season: 'JUN',
    ink: 0,
    build: 0,
    sunrise: 0,
    dusk: 0,
    lapse: false,
    lastInput: 0,
  };
}

const SEASON_SPEC: Record<Season, { noonAlt: number; rise: number; set: number; label: string }> = {
  JUN: { noonAlt: 66, rise: 5.5, set: 21.5, label: 'SOLSTICE' },
  SEP: { noonAlt: 42, rise: 7, set: 19.5, label: 'EQUINOX' },
  DEC: { noonAlt: 19, rise: 8.2, set: 16.7, label: 'SOLSTICE' },
};

export interface Sun {
  t: number;
  altitude: number;
  shadowLen: number;
  sunX: number;
  intensity: number;
}

export function sunAt(day: number, season: Season): Sun {
  const t = Math.min(Math.max(day, 0.02), 0.98);
  const spec = SEASON_SPEC[season];
  const altitude = Math.max(spec.noonAlt * Math.sin(Math.PI * t), 7);
  const altRad = (altitude * Math.PI) / 180;
  return {
    t,
    altitude,
    shadowLen: Math.min(1 / Math.tan(altRad), 4.6),
    sunX: t,
    intensity: Math.min(1, altitude / 38),
  };
}

export function timeLabel(day: number, season: Season): string {
  const spec = SEASON_SPEC[season];
  const hours = spec.rise + (spec.set - spec.rise) * Math.min(Math.max(day, 0), 1);
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function seasonLabel(season: Season): string {
  return `${season} · ${SEASON_SPEC[season].label}`;
}

interface Box {
  u: number;
  v: number;
  w: number;
  d: number;
  h: number;
}

const BOXES: Box[] = [
  { u: 6, v: 10, w: 60, d: 2.4, h: 8 },
  { u: 58, v: 22, w: 13, d: 30, h: 40 },
  { u: 16, v: 30, w: 30, d: 12, h: 13 },
  { u: 16, v: 42, w: 12, d: 26, h: 13 },
  { u: 40, v: 52, w: 24, d: 16, h: 7 },
];

const TREE = { u: 88, v: 66, r: 7, h: 12 };

const HSCALE = 0.82;

function project(u: number, v: number, h: number, scale: number, ox: number, oy: number): [number, number] {
  return [ox + (u - v) * 0.7071 * scale, oy + ((u + v) * 0.3536 - h * HSCALE) * scale];
}

function hull(points: [number, number][]): [number, number][] {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function poly(ctx: CanvasRenderingContext2D, pts: [number, number][]): void {
  if (pts.length < 3) return;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
}

function mix(a: [number, number, number], b: [number, number, number], t: number): string {
  const k = Math.min(Math.max(t, 0), 1);
  const c = a.map((x, i) => Math.round(x + (b[i] - x) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const PAPER: [number, number, number] = [245, 244, 240];
const CONCRETE: [number, number, number] = [237, 235, 229];
const SHADE: [number, number, number] = [199, 195, 187];
const INK: [number, number, number] = [26, 26, 26];

export interface HeliodonLayout {
  scale: number;
  ox: number;
  oy: number;
}

export function layoutFor(width: number, height: number, portrait: boolean): HeliodonLayout {
  if (portrait) {
    const scale = Math.min(width / 210, (height * 0.4) / 120);
    return { scale, ox: width * 0.52, oy: height * 0.18 };
  }
  const scale = Math.min((width * 0.5) / 175, (height * 0.62) / 120);
  return { scale, ox: width * 0.66, oy: height * 0.17 };
}

export function drawHeliodon(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: HeliodonState,
  layout: HeliodonLayout,
): void {
  const sun = sunAt(state.day, state.season);
  const { scale, ox, oy } = layout;
  const duskDim = 1 - state.dusk * 0.72;
  const reach = state.sunrise * duskDim;

  ctx.clearRect(0, 0, width, height);

  if (state.build > 0.01) {
    const fromLeft = sun.sunX < 0.5;
    const glow = ctx.createLinearGradient(fromLeft ? 0 : width, 0, fromLeft ? width : 0, 0);
    const warmth = 0.055 * state.build * sun.intensity * duskDim;
    glow.addColorStop(0, `rgba(184,115,51,${warmth.toFixed(4)})`);
    glow.addColorStop(0.6, 'rgba(184,115,51,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  const sunSide = (sun.sunX - 0.5) * 2;
  const rawVec: [number, number] = [-sunSide, 0.46];
  const norm = Math.hypot(rawVec[0], rawVec[1]) || 1;
  const stretch = sun.shadowLen * (1 + state.dusk * 2.6) * HSCALE * scale;
  const vec: [number, number] = [(rawVec[0] / norm) * stretch, (rawVec[1] / norm) * stretch];

  const shadowAlpha = (0.2 + 0.06 * state.dusk) * reach;
  if (shadowAlpha > 0.005) {
    ctx.save();
    ctx.filter = 'blur(4px)';
    ctx.fillStyle = `rgba(116,104,90,${shadowAlpha.toFixed(4)})`;
    for (const b of BOXES) {
      const base: [number, number][] = (
        [
          [b.u, b.v],
          [b.u + b.w, b.v],
          [b.u + b.w, b.v + b.d],
          [b.u, b.v + b.d],
        ] as [number, number][]
      ).map(([cu, cv]) => project(cu, cv, 0, scale, ox, oy));
      const cast: [number, number][] = base.map(([x, y]) => [
        x + vec[0] * b.h * reach,
        y + vec[1] * b.h * reach,
      ]);
      poly(ctx, hull(base.concat(cast)));
      ctx.fill();
    }
    const [tbx, tby] = project(TREE.u, TREE.v, 0, scale, ox, oy);
    ctx.beginPath();
    ctx.ellipse(
      tbx + vec[0] * TREE.h * reach,
      tby + vec[1] * TREE.h * reach,
      TREE.r * scale,
      TREE.r * scale * 0.45,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.restore();
  }

  const litRight = sunSide > 0 ? 1 : 0;
  const inkStroke = mix(INK, PAPER, 0.12);
  const faceFill = (isRight: number) => {
    const facing = isRight === litRight ? Math.abs(sunSide) : -Math.abs(sunSide);
    const lit = Math.max(0, facing * 0.75 + 0.25) * sun.intensity * reach;
    return mix(SHADE, CONCRETE, 0.3 + lit * 0.7);
  };

  const ordered = [...BOXES].sort((a, b) => a.u + a.v + (a.w + a.d) / 2 - (b.u + b.v + (b.w + b.d) / 2));

  const dash = Math.max(state.ink, 0.0001);
  for (const b of ordered) {
    const p = (u: number, v: number, h: number) => project(u, v, h, scale, ox, oy);
    const top: [number, number][] = [
      p(b.u, b.v, b.h),
      p(b.u + b.w, b.v, b.h),
      p(b.u + b.w, b.v + b.d, b.h),
      p(b.u, b.v + b.d, b.h),
    ];
    const left: [number, number][] = [
      p(b.u, b.v + b.d, b.h),
      p(b.u + b.w, b.v + b.d, b.h),
      p(b.u + b.w, b.v + b.d, 0),
      p(b.u, b.v + b.d, 0),
    ];
    const right: [number, number][] = [
      p(b.u + b.w, b.v, b.h),
      p(b.u + b.w, b.v + b.d, b.h),
      p(b.u + b.w, b.v + b.d, 0),
      p(b.u + b.w, b.v, 0),
    ];

    if (state.build > 0.01) {
      ctx.globalAlpha = state.build;
      poly(ctx, left);
      ctx.fillStyle = faceFill(0);
      ctx.fill();
      poly(ctx, right);
      ctx.fillStyle = faceFill(1);
      ctx.fill();
      poly(ctx, top);
      ctx.fillStyle = mix(SHADE, PAPER, 0.5 + 0.5 * sun.intensity * reach);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.strokeStyle = inkStroke;
    ctx.lineWidth = 1;
    ctx.setLineDash([900]);
    ctx.lineDashOffset = 900 * (1 - dash);
    for (const face of [top, left, right]) {
      poly(ctx, face);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  const treeIn = Math.min(Math.max((state.ink - 0.55) / 0.45, 0), 1);
  if (treeIn > 0) {
    const [tx, ty] = project(TREE.u, TREE.v, TREE.h, scale, ox, oy);
    const [tbx, tby] = project(TREE.u, TREE.v, 0, scale, ox, oy);
    ctx.globalAlpha = treeIn;
    if (state.build > 0.01) {
      ctx.globalAlpha = treeIn * state.build;
      ctx.beginPath();
      ctx.arc(tx, ty, TREE.r * scale, 0, Math.PI * 2);
      ctx.fillStyle = mix(SHADE, CONCRETE, 0.45 + 0.55 * sun.intensity * reach);
      ctx.fill();
    }
    ctx.globalAlpha = treeIn;
    ctx.strokeStyle = inkStroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tbx, tby);
    ctx.lineTo(tx, ty + TREE.r * scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(tx, ty, TREE.r * scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}
