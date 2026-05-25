"use client";
import * as React from "react";
import type { Editor } from "@tiptap/react";
import { useWindowSize } from "@/hooks/use-window-size";

interface RectState {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseCursorVisibilityOptions {
  editor: Editor | null;
  overlayHeight?: number;
  elementRef?: React.RefObject<HTMLElement> | null;
}

export function useCursorVisibility({
  editor,
  overlayHeight = 0,
  elementRef = null,
}: UseCursorVisibilityOptions): RectState {
  const { height: windowHeight } = useWindowSize();
  const [rect, setRect] = React.useState<RectState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const updateRect = React.useCallback((): void => {
    const element = elementRef?.current ?? document.body;
    const { x, y, width, height } = element.getBoundingClientRect();
    setRect({ x, y, width, height });
  }, [elementRef]);

  React.useEffect(() => {
    const element = elementRef?.current ?? document.body;

    updateRect();

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateRect);
    });

    resizeObserver.observe(element);
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateRect);
    };
  }, [elementRef, updateRect]);

  React.useEffect(() => {
    const ensureCursorVisibility = (): void => {
      if (!editor) return;

      const { state, view } = editor;

      if (!view.hasFocus()) return;

      const { from } = state.selection;
      const cursorCoords = view.coordsAtPos(from);

      if (windowHeight < rect.height) {
        if (cursorCoords) {
          const availableSpace =
            windowHeight - cursorCoords.top - overlayHeight > 0;

          if (!availableSpace) {
            const targetScrollY = cursorCoords.top - windowHeight / 2;

            window.scrollTo({
              top: targetScrollY,
              behavior: "smooth",
            });
          }
        }
      }
    };

    ensureCursorVisibility();
  }, [editor, overlayHeight, windowHeight, rect.height]);

  return rect;
}
