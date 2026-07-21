import { useState } from "react";

// ─── Hexagon primitives ───────────────────────────────────────────────────────

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

interface HexProps {
  cx: number;
  cy: number;
  r: number;
  filled?: boolean;
  opacity?: number;
  strokeWidth?: number;
}

function Hex({ cx, cy, r, filled = false, opacity = 1, strokeWidth = 1.5 }: HexProps) {
  return (
    <polygon
      points={hexPoints(cx, cy, r)}
      fill={filled ? "#E8963C" : "none"}
      stroke={filled ? "#E8963C" : "#E8963C"}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}

// ─── Background hexagon texture (bleeds off edge) ────────────────────────────

function BgHex({ right = true }: { right?: boolean }) {
  const cx = right ? 960 : 40;
  const cy = -80;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMid slice"
    >
      <polygon
        points={hexPoints(cx, cy, 360)}
        fill="none"
        stroke="#E8963C"
        strokeWidth="1.5"
        opacity="0.08"
      />
    </svg>
  );
}

// ─── Shared slide wrapper ─────────────────────────────────────────────────────

function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col ${className}`}
      style={{ background: "#0E0F13" }}
    >
      {children}
    </div>
  );
}

// ─── Eyebrow label ────────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        color: "#8A9B8E",
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0"
      style={{ padding: "0 80px 36px" }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          color: "#8A9B8E",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        UX Audit Playbook — Overview
      </span>
    </div>
  );
}

// ─── SLIDE 1 — Title ──────────────────────────────────────────────────────────

function Slide1() {
  return (
    <Slide>
      {/* Background hex bleeds top-right */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large hex outline, top-right bleed */}
        <polygon
          points={hexPoints(920, -60, 340)}
          fill="none"
          stroke="#E8963C"
          strokeWidth="1.5"
          opacity="0.08"
        />
        {/* Bottom-left wedge of the hex filled amber */}
        <clipPath id="s1-clip">
          <rect x="580" y="200" width="380" height="340" />
        </clipPath>
        <polygon
          points={hexPoints(920, -60, 340)}
          fill="#E8963C"
          stroke="none"
          opacity="1"
          clipPath="url(#s1-clip)"
        />
      </svg>

      {/* Content */}
      <div
        className="relative flex flex-col justify-center h-full"
        style={{ padding: "0 80px" }}
      >
        <Eyebrow>A Framework by Carla Chahwan</Eyebrow>
        <h1
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "84px",
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "#F4F1EA",
            marginTop: "20px",
            maxWidth: "620px",
          }}
        >
          UX Audit
          <br />
          Playbook
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            color: "#8A9B8E",
            marginTop: "28px",
            letterSpacing: "0.01em",
            maxWidth: "440px",
          }}
        >
          Auditing digital platforms — for the business and its users.
        </p>
      </div>

      <Footer />
    </Slide>
  );
}

// ─── SLIDE 2 — The Problem ────────────────────────────────────────────────────

function Slide2() {
  return (
    <Slide>
      <BgHex right={false} />
      <div
        className="relative flex flex-col justify-center h-full"
        style={{ padding: "0 80px" }}
      >
        <Eyebrow>01 — The Problem</Eyebrow>
        <h2
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "52px",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#F4F1EA",
            marginTop: "20px",
            maxWidth: "640px",
          }}
        >
          Most audits describe screens.
          <br />
          Ours diagnose journeys.
        </h2>

        {/* Two-column comparison */}
        <div className="flex mt-14" style={{ gap: "0", maxWidth: "680px" }}>
          {/* Left: Typical audit */}
          <div className="flex-1" style={{ paddingRight: "48px" }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: "#696969",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Typical Audit
            </p>
            {["Catalogues UI inconsistencies", "Rates isolated screens", "No measurable outcome"].map(
              (line) => (
                <div
                  key={line}
                  className="flex items-center"
                  style={{ marginBottom: "12px" }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#3A3D45",
                      textDecoration: "line-through",
                      textDecorationColor: "#2A2C33",
                    }}
                  >
                    {line}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Hairline divider */}
          <div style={{ width: "1px", background: "#2A2C33", alignSelf: "stretch" }} />

          {/* Right: This playbook */}
          <div className="flex-1" style={{ paddingLeft: "48px" }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: "#8A9B8E",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              This Playbook
            </p>
            {[
              "Pinpoints where users get stuck — and the business cost",
              "Every finding paired with an actionable recommendation",
              "Prioritised roadmap mapped directly to evidence",
            ].map((line) => (
              <div
                key={line}
                className="flex items-center"
                style={{ marginBottom: "12px", gap: "12px" }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
                  <polygon points={hexPoints(5, 5, 4.5)} fill="#E8963C" />
                </svg>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#F4F1EA",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </Slide>
  );
}

// ─── SLIDE 3 — The Framework (Honeycomb) ─────────────────────────────────────

function Honeycomb() {
  // FLAT-TOP hexagons. This orientation is the only way to guarantee equal
  // edge-to-edge gaps for ALL adjacent pairs (center↔outer and outer↔outer).
  //
  // Why flat-top works:
  //   With flat-top hexes and neighbors placed at edge-midpoint angles
  //   (90°, 30°, -30°, -90°, -150°, 150°), every adjacent pair faces each
  //   other flat-edge → flat-edge. The gap between any two adjacent hexes is:
  //     gap = d − 2 × inradius = d − drawR × √3
  //   This formula is identical for all 12 adjacent pairs in the cluster.
  //
  // With pointy-top hexes the center faces neighbors vertex→vertex (gap = d − 2r)
  // while outer pairs face flat→flat (gap = d − r√3) — structurally unequal.

  const drawR = 82;                         // circumradius of each hexagon
  const gap   = 24;                         // equal edge-to-edge gap (all pairs)
  const d     = drawR * Math.sqrt(3) + gap; // center-to-center distance

  // Flat-top vertices: 0°, 60°, 120°, 180°, 240°, 300°
  function pts(cx: number, cy: number) {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i);
      return `${cx + drawR * Math.cos(a)},${cy + drawR * Math.sin(a)}`;
    }).join(" ");
  }

  // Neighbors at edge-midpoint angles so all faces are flat→flat
  const surrounding = [
    { label: "USABLE",     angle:  90 },
    { label: "USEFUL",     angle:  30 },
    { label: "CREDIBLE",   angle: -30 },
    { label: "ACCESSIBLE", angle: -90 },
    { label: "FINDABLE",   angle: -150 },
    { label: "DESIRABLE",  angle:  150 },
  ].map(({ label, angle }) => ({
    label,
    cx:  d * Math.cos((Math.PI / 180) * angle),
    cy: -d * Math.sin((Math.PI / 180) * angle), // SVG y is inverted
  }));

  // ViewBox: outermost point = d (neighbor center) + drawR (its far vertex)
  const pad    = 14;
  const extent = d + drawR + pad;
  const vbSize = extent * 2;

  const labelSize  = drawR * 0.175;
  const centerSize = drawR * 0.145;

  return (
    <svg
      viewBox={`${-extent} ${-extent} ${vbSize} ${vbSize}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {surrounding.map(({ label, cx, cy }) => (
        <g key={label}>
          <polygon
            points={pts(cx, cy)}
            fill="none"
            stroke="#E8963C"
            strokeWidth="2"
            opacity="0.7"
          />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: `${labelSize}px`,
              fontWeight: 500,
              fill: "#F4F1EA",
              letterSpacing: "0.08em",
            }}
          >
            {label}
          </text>
        </g>
      ))}

      {/* Center: VALUABLE — amber filled */}
      <polygon points={pts(0, 0)} fill="#E8963C" stroke="none" />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: `${centerSize}px`,
          fontWeight: 700,
          fill: "#0E0F13",
          letterSpacing: "0.14em",
        }}
      >
        VALUABLE
      </text>
    </svg>
  );
}

function Slide3() {
  // Slide is 16:9. Usable height after top/bottom safe zone = ~90% of slide height.
  // We size the honeycomb container to 85vh-equivalent using a percentage of the
  // slide height. Since the slide itself scales via aspect-ratio, we use a fixed
  // pixel size relative to the SVG viewBox — the SVG's preserveAspectRatio handles
  // the rest. Container is constrained by both axes so nothing clips.
  return (
    <Slide>
      <div className="relative flex h-full" style={{ padding: "0 80px" }}>
        {/* Left: text — narrow column */}
        <div
          className="flex flex-col justify-center"
          style={{ flex: "0 0 36%", paddingRight: "40px" }}
        >
          <Eyebrow>02 — The Lens</Eyebrow>
          <h2
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "52px",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#F4F1EA",
              marginTop: "20px",
            }}
          >
            Seven pillars.
            <br />
            One user.
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#8A9B8E",
              marginTop: "24px",
              lineHeight: 1.65,
            }}
          >
            Each pillar is assessed against real user journeys, backed by annotated screenshots — minimum two findings per pillar.
          </p>
        </div>

        {/* Right: honeycomb fills remaining width, constrained to slide height */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{ padding: "24px 0 52px" }}
        >
          {/*
            The SVG viewBox is square (2*extent × 2*extent).
            We let it fill the available height, capped by available width,
            so the cluster scales to ~85% of slide height with no clipping.
          */}
          <div
            style={{
              height: "85%",
              aspectRatio: "1 / 1",
              maxWidth: "100%",
            }}
          >
            <Honeycomb />
          </div>
        </div>
      </div>

      <Footer />
    </Slide>
  );
}

// ─── SLIDE 4 — How It Works ───────────────────────────────────────────────────

const STEPS = [
  { num: "01", title: "Foundations", desc: "Platform goals, target audiences, mapped user journeys." },
  { num: "02", title: "Evaluation", desc: "Journey-level findings with annotated visual evidence." },
  { num: "03", title: "Recommendations", desc: "Every issue gets a clear next step — fix, test, or review." },
  { num: "04", title: "Roadmap", desc: "Sequenced by priority, timeline, and action plan." },
];

function Slide4() {
  return (
    <Slide>
      <BgHex right />
      <div
        className="relative flex flex-col justify-center h-full"
        style={{ padding: "0 80px" }}
      >
        <Eyebrow>03 — The Process</Eyebrow>
        <h2
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "52px",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#F4F1EA",
            marginTop: "20px",
            marginBottom: "56px",
          }}
        >
          Four steps. Zero ambiguity.
        </h2>

        {/* Timeline */}
        <div className="relative" style={{ paddingTop: "16px" }}>
          {/* Hairline */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "0",
              right: "0",
              height: "1px",
              background: "#2A2C33",
            }}
          />

          <div className="flex" style={{ gap: "0" }}>
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex-1 relative" style={{ paddingRight: i < 3 ? "40px" : "0" }}>
                {/* Node dot */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "0",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#E8963C",
                    transform: "translateY(50%)",
                  }}
                />

                {/* Ghost numeral */}
                <div
                  style={{
                    fontFamily: "Fraunces, Georgia, serif",
                    fontSize: "100px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#F4F1EA",
                    opacity: 0.06,
                    letterSpacing: "-0.04em",
                    marginTop: "8px",
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </div>

                <div style={{ marginTop: "-60px", paddingLeft: "0" }}>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#F4F1EA",
                      letterSpacing: "0.02em",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "#8A9B8E",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </Slide>
  );
}

// ─── SLIDE 5 — The Output ─────────────────────────────────────────────────────

type Priority = "Critical" | "Medium" | "Optimising";

interface TableRow {
  issue: string;
  priority: Priority;
  timeline: string;
  action: string;
}

const TABLE_ROWS: TableRow[] = [
  { issue: "Checkout friction", priority: "Critical", timeline: "NOW", action: "Simplify payment flow" },
  { issue: "Unclear value proposition", priority: "Medium", timeline: "NEXT", action: "Test revised messaging" },
  { issue: "Inconsistent navigation labels", priority: "Optimising", timeline: "LATER", action: "Content audit" },
];

function PriorityPill({ value }: { value: Priority }) {
  const styles: Record<Priority, React.CSSProperties> = {
    Critical: {
      background: "#E8963C",
      color: "#0E0F13",
      border: "none",
    },
    Medium: {
      background: "transparent",
      color: "#8A9B8E",
      border: "1px solid #8A9B8E",
    },
    Optimising: {
      background: "transparent",
      color: "#3A3D45",
      border: "1px solid #2A2C33",
    },
  };

  return (
    <span
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: "2px",
        display: "inline-block",
        ...styles[value],
      }}
    >
      {value}
    </span>
  );
}

function Slide5() {
  return (
    <Slide>
      <BgHex right={false} />
      <div
        className="relative flex flex-col justify-center h-full"
        style={{ padding: "0 80px" }}
      >
        <Eyebrow>04 — The Deliverable</Eyebrow>
        <h2
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "56px",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#F4F1EA",
            marginTop: "20px",
            marginBottom: "48px",
          }}
        >
          A decision-ready roadmap.
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: "#8A9B8E",
            marginTop: "12px",
            marginBottom: "36px",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          Recommendations are traceable to findings — advice rooted in evidence, never opinion.
        </p>

        {/* Table */}
        <div style={{ maxWidth: "800px" }}>
          {/* Header row */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "2fr 1fr 1fr 2.5fr",
              borderBottom: "1px solid #2A2C33",
              paddingBottom: "10px",
              marginBottom: "0",
            }}
          >
            {["Issue", "Priority", "Timeline", "Action"].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  color: "#696969",
                  textTransform: "uppercase",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Data rows */}
          {TABLE_ROWS.map((row) => (
            <div
              key={row.issue}
              className="grid items-center"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 2.5fr",
                borderBottom: "1px solid #2A2C33",
                padding: "16px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#F4F1EA",
                }}
              >
                {row.issue}
              </span>
              <span>
                <PriorityPill value={row.priority} />
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: "#8A9B8E",
                }}
              >
                {row.timeline}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#8A9B8E",
                }}
              >
                {row.action}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </Slide>
  );
}

// ─── SLIDE 6 — Closing ────────────────────────────────────────────────────────

function Slide6() {
  return (
    <Slide>
      <div
        className="relative flex flex-col justify-center h-full"
        style={{ padding: "0 80px" }}
      >
        <Eyebrow>What's Next</Eyebrow>
        <h2
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "68px",
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "#F4F1EA",
            marginTop: "20px",
            maxWidth: "600px",
          }}
        >
          The full playbook
          <br />
          goes deeper.
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            color: "#8A9B8E",
            marginTop: "28px",
            maxWidth: "440px",
            lineHeight: 1.6,
          }}
        >
          Step-by-step criteria, scoring, and templates — let's walk through it together.
        </p>

        {/* Single amber hex */}
        <div style={{ marginTop: "48px" }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <polygon points={hexPoints(20, 20, 18)} fill="#E8963C" />
          </svg>
        </div>
      </div>

      {/* Contact — sits above the footer */}
      <div
        style={{
          position: "absolute",
          bottom: "64px",
          left: "80px",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "#8A9B8E",
            lineHeight: 1.7,
          }}
        >
          Carla Chahwan · Strategic UX Architect
          <br />
          <span style={{ color: "#3A3D45" }}>chahwancarla1@gmail.com</span>
        </p>
      </div>

      <Footer />
    </Slide>
  );
}

// ─── Slide navigation dots ───────────────────────────────────────────────────

function NavDots({ current, total, onChange }: { current: number; total: number; onChange: (i: number) => void }) {
  return (
    <div
      className="flex items-center"
      style={{ gap: "10px" }}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          style={{
            width: i === current ? "24px" : "6px",
            height: "6px",
            borderRadius: "3px",
            background: i === current ? "#E8963C" : "#2A2C33",
            border: "none",
            cursor: "pointer",
            transition: "all 0.25s ease",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];

export default function App() {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => Math.max(0, c - 1));
  }

  function next() {
    setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
  }

  const SlideComponent = SLIDES[current];

  return (
    <div
      className="size-full flex flex-col items-center justify-center"
      style={{ background: "#0E0F13", outline: "none" }}
      tabIndex={0}
      onKeyDown={handleKey}
    >
      {/* Slide frame — 16:9 aspect ratio */}
      <div
        style={{
          width: "min(100%, calc(100vh * 16/9))",
          aspectRatio: "16 / 9",
          position: "relative",
          boxShadow: "0 0 0 1px #2A2C33",
        }}
      >
        <SlideComponent />
      </div>

      {/* Navigation dots only */}
      <div style={{ marginTop: "24px" }}>
        <NavDots current={current} total={SLIDES.length} onChange={setCurrent} />
      </div>
    </div>
  );
}