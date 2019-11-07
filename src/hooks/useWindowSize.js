import { useState, useEffect } from "react";

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

export default function() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const onResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return [windowSize.width, windowSize.height];
}
