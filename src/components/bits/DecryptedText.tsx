"use client";

import { useEffect, useState } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  sequential?: boolean;
}

const CHARACTERS = "ABCDEF0123456789_#*<>~+-";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  className = "",
  sequential = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (sequential) {
              if (index < iteration / 2) return text[index];
            } else {
              if (iteration >= maxIterations) return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration > (sequential ? text.length * 2 : maxIterations)) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, sequential]);

  return <span className={className}>{displayText}</span>;
}
