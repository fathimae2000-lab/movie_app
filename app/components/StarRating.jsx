"use client";

import { useState, useId } from "react";

const StarPath = ({ cx, cy, size }) => {
  const outerR = size / 2;
  const innerR = outerR * 0.42;

  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;

    return `${i === 0 ? "M" : "L"}${
      (cx + r * Math.cos(angle)).toFixed(2)
    },${(cy + r * Math.sin(angle)).toFixed(2)}`;
  });

  return <path d={points.join(" ") + " Z"} />;
};

const StarRating = ({
  rating = 0,
  max = 5,
  size = 20,
  interactive = false,
  onChange,
}) => {
  const safeRating = Number(rating) || 0;
  const safeMax = Number(max) || 5;
  const safeSize = Number(size) || 20;

  const uniqueId = useId();

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(0);

  const displayed = interactive
    ? hovered ?? selected
    : safeRating;

  const gap = safeSize * 0.22;

  const totalWidth =
    safeMax * safeSize + (safeMax - 1) * gap;

  const FILLED = "#F59E0B";
  const EMPTY = "#D1D5DB";

  const handleMouseMove = (e) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const star = Math.min(
      safeMax,
      Math.max(
        1,
        Math.ceil((x / totalWidth) * safeMax)
      )
    );

    setHovered(star);
  };

  const handleClick = (e) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const star = Math.min(
      safeMax,
      Math.max(
        1,
        Math.ceil((x / totalWidth) * safeMax)
      )
    );

    setSelected(star);
    onChange?.(star);
  };

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${safeSize}`}
      width={totalWidth}
      height={safeSize}
      style={{
        display: "block",
        cursor: interactive ? "pointer" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}
      onClick={handleClick}
    >
      <defs>
        {Array.from({ length: safeMax }, (_, i) => {
          const filled = displayed - i;

          if (filled > 0 && filled < 1) {
            const pct = Math.round(filled * 100);

            return (
              <linearGradient
                key={i}
                id={`${uniqueId}-grad-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset={`${pct}%`}
                  stopColor={FILLED}
                />
                <stop
                  offset={`${pct}%`}
                  stopColor="transparent"
                />
              </linearGradient>
            );
          }

          return null;
        })}
      </defs>

      {Array.from({ length: safeMax }, (_, i) => {
        const cx =
          i * (safeSize + gap) + safeSize / 2;

        const cy = safeSize / 2;

        const filled = displayed - i;

        return (
          <g key={i}>
            {/* Empty Star */}
            <g fill={EMPTY}>
              <StarPath
                cx={cx}
                cy={cy}
                size={safeSize}
              />
            </g>

            {/* Filled Star */}
            {filled > 0 && (
              <g
                fill={
                  filled >= 1
                    ? FILLED
                    : `url(#${uniqueId}-grad-${i})`
                }
              >
                <StarPath
                  cx={cx}
                  cy={cy}
                  size={safeSize}
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default StarRating;