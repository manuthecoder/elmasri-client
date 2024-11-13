"use client";

import { useEffect } from "react";
import { addStyles } from "react-mathquill";

export default function MathLoader() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      addStyles();
    }
  }, []);
  return null;
}
