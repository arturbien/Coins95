import { useLayoutEffect } from "react";

function useLockBodyScroll() {
  const root = document.getElementById("root") as HTMLElement;
  useLayoutEffect(() => {
    // Get current scroll  Y value
    const scrollY = window.pageYOffset;
    window.scrollTo(0, 0);

    const { position: originalRootPosition } = window.getComputedStyle(root);
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    root.style.position = "fixed";
    root.style.width = "100%";
    root.style.height = "100%";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "";
      root.style.overflow = "";
      root.style.position = originalRootPosition;
      root.style.width = "";
      root.style.height = "";

      root.scrollTo(0, 0);
      window.scrollTo(0, scrollY);
    };
  }, [root]); // Empty array ensures effect is only run on mount and unmount
}

export default useLockBodyScroll;
