import React, { useEffect, useRef } from "react";

type CurlyTickerProps = {
  phrase?: string;
  durationSec?: number; // time for one text-length to move across (adjust speed)
  direction?: "ltr" | "rtl"; // left->right or right->left
};

const CurlyTicker: React.FC<CurlyTickerProps> = ({
  phrase = "Build Wealth, One Lot at a Time • ",
  durationSec = 18,
  direction = "ltr",
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const textEl1Ref = useRef<SVGTextElement | null>(null);
  const textEl2Ref = useRef<SVGTextElement | null>(null);
  const textPath1Ref = useRef<SVGTextPathElement | null>(null);
  const textPath2Ref = useRef<SVGTextPathElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const xRef = useRef(0);

  useEffect(() => {
    if (
      !pathRef.current ||
      !textEl1Ref.current ||
      !textEl2Ref.current ||
      !textPath1Ref.current ||
      !textPath2Ref.current
    )
      return;

    const path = pathRef.current;
    const tEl1 = textEl1Ref.current!;
    const tEl2 = textEl2Ref.current!;
    const tPath1 = textPath1Ref.current!;
    const tPath2 = textPath2Ref.current!;
    let cancelled = false;

    const setupTicker = async () => {
      // Wait for fonts to load
      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 50));

      const pLen = path.getTotalLength();

      let repeats = 1;
      let text = phrase.repeat(repeats);
      tPath1.textContent = text;
      tPath2.textContent = text;

      // Measure text length until it fills the path
      let attempts = 0;
      let tLen = Math.max(
        tEl1.getComputedTextLength() || 0,
        tEl2.getComputedTextLength() || 0
      );

      while (
        (tLen < pLen * 1.02 || tLen === 0) &&
        attempts < 60 &&
        !cancelled
      ) {
        repeats++;
        text = phrase.repeat(repeats);
        tPath1.textContent = text;
        tPath2.textContent = text;
        await new Promise((r) => requestAnimationFrame(r));
        tLen = Math.max(
          tEl1.getComputedTextLength(),
          tEl2.getComputedTextLength()
        );
        attempts++;
      }

      if (cancelled) return;

      const T = Math.max(1, tLen);

      // Safari detection
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );

      if (isSafari) {
        // Push second text copy horizontally after the first one
        const len1 = tEl1.getComputedTextLength();
        const len2 = tEl2.getComputedTextLength();
        const maxLen = Math.max(len1, len2, 1);

        xRef.current = -maxLen; // first copy starts fully left
        tPath1.setAttribute("startOffset", String(xRef.current));
        // Add some buffer space between the two texts for Safari
        tPath2.setAttribute("startOffset", String(xRef.current + maxLen + 10)); // Adding a 10px buffer
      } else {
        // Normal logic for other browsers
        xRef.current = -T;
        tPath1.setAttribute("startOffset", String(xRef.current));
        tPath2.setAttribute("startOffset", String(xRef.current + T));
      }

      let baseSpeed = T / Math.max(0.001, durationSec);
      if (direction === "rtl") baseSpeed = -baseSpeed;

      let last = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const dt = (now - last) / 1000;
        last = now;

        xRef.current += baseSpeed * dt;

        if (xRef.current > 0)
          xRef.current -= T * Math.ceil((xRef.current - 0) / T);
        if (xRef.current <= -T)
          xRef.current += T * Math.ceil((-T - xRef.current) / T);

        tPath1.setAttribute("startOffset", String(xRef.current));
        tPath2.setAttribute("startOffset", String(xRef.current + T));

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    setupTicker();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phrase, durationSec, direction]);

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none z-50">
      <svg
        className="w-full h-[320] block"
        viewBox="0 0 1440 420"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Curly path that spans beyond the edges (so text can enter/exit) */}
          <path
            id="ribbonPath"
            ref={pathRef}
            d="
    M -200,280
    C 600,360 400,500 500,460   <!-- dip under at ~30% -->
    S 900,100 1100,180           <!-- stronger climb starting ~70% -->
    S 1440,40 1600,0             <!-- finish near the top-right -->
  "
          />
        </defs>

        {/* Ribbon stroke (even thickness) */}
        <use
          href="#ribbonPath"
          fill="none"
          stroke="#89E081"
          strokeWidth="45"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ vectorEffect: "non-scaling-stroke" }}
        />

        {/* two text copies (content gets replaced in effect) */}
        <text
          ref={textEl1Ref}
          fill="black"
          fontSize="16"
          fontWeight={600}
          letterSpacing="1.2"
          dominantBaseline="middle"
        >
          <textPath ref={textPath1Ref} href="#ribbonPath">
            {phrase.repeat(3)}
          </textPath>
        </text>

        <text
          ref={textEl2Ref}
          fill="black"
          fontSize="16"
          fontWeight={600}
          letterSpacing="1.2"
          dominantBaseline="middle"
        >
          <textPath ref={textPath2Ref} href="#ribbonPath">
            {phrase.repeat(3)}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurlyTicker;
