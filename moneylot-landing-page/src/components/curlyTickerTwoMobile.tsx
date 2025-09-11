import React, { useEffect, useRef } from "react";

type CurlyTickerProps = {
  phrase?: string;
  durationSec?: number;
  direction?: "ltr" | "rtl";
};

const CurlyTicker2Mobile: React.FC<CurlyTickerProps> = ({
  phrase = "Build Wealth, One Lot at a Time •  ",
  durationSec = 38,
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

    const nextFrame = () => new Promise((r) => requestAnimationFrame(r));
    let cancelled = false;

    (async () => {
      const pLen = path.getTotalLength();
      let repeats = 1;
      let text = phrase.repeat(repeats);
      tPath1.textContent = text;
      tPath2.textContent = text;

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
        await nextFrame();
        tLen = Math.max(
          tEl1.getComputedTextLength(),
          tEl2.getComputedTextLength()
        );
        attempts++;
      }

      if (cancelled) return;

      const T = Math.max(1, tLen);
      xRef.current = -T;

      tPath1.textContent = text;
      tPath2.textContent = text;

      tPath1.setAttribute("startOffset", String(xRef.current));
      tPath2.setAttribute("startOffset", String(xRef.current + T));

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
    })();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phrase, durationSec, direction]);

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none z-50">
      <svg
        className="w-full h-[420] block"
        viewBox="0 0 1440 420"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="ribbonPath2"
            ref={pathRef}
            d="
              M -200,900
              C 900,420 400,480 1050,400
              S 1250,500 1940,460
              S 1900,200 1900,400
            "
          />
        </defs>

        <use
          href="#ribbonPath2"
          fill="none"
          stroke="#89E081"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ vectorEffect: "non-scaling-stroke" }}
        />

        <text
          ref={textEl1Ref}
          fill="black"
          fontSize="16"
          fontWeight={600}
          letterSpacing="1.2"
          dominantBaseline="middle"
        >
          <textPath ref={textPath1Ref} href="#ribbonPath2">
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
          <textPath ref={textPath2Ref} href="#ribbonPath2">
            {phrase.repeat(3)}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurlyTicker2Mobile;
