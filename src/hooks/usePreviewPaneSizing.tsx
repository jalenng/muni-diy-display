import useResizeObserver from "@react-hook/resize-observer";
import { useState, useLayoutEffect, useMemo, MutableRefObject } from "react";

const PREVIEW_NATURAL_SIZE = {
  width: 780,
  height: 447,
};

export function usePreviewPaneSizing(
  previewContainerRef: MutableRefObject<HTMLDivElement | null>,
  offset?: { x?: number; y?: number }
) {
  const [previewAreaSize, setPreviewAreaSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (previewContainerRef.current) {
      setPreviewAreaSize(previewContainerRef.current.getBoundingClientRect());
    }
  }, [previewContainerRef]);

  useResizeObserver(previewContainerRef, (entry) =>
    setPreviewAreaSize({
      width: entry.contentRect.width - (offset?.x ?? 0),
      height: entry.contentRect.height - (offset?.y ?? 0),
    })
  );

  const previewIframeWrapperStyles = useMemo(() => {
    const aspectRatio =
      PREVIEW_NATURAL_SIZE.width / PREVIEW_NATURAL_SIZE.height;
    const heightByWidth = previewAreaSize.width / aspectRatio;

    // limited by width
    // if (heightByWidth <= previewAreaSize.height) {
    return {
      width: previewAreaSize.width,
      height: heightByWidth,
    };
    // }
    // // limited by height
    // else {
    //   const widthByHeight = previewAreaSize.height * aspectRatio;
    //   return {
    //     width: widthByHeight,
    //     height: previewAreaSize.height,
    //   };
    // }
  }, [previewAreaSize]);

  const previewIframeStyles = useMemo(() => {
    const scaleRatio =
      previewIframeWrapperStyles.width / PREVIEW_NATURAL_SIZE.width;
    return {
      width: PREVIEW_NATURAL_SIZE.width,
      height: PREVIEW_NATURAL_SIZE.height,
      transform: `scale(${scaleRatio})`,
      transformOrigin: "top left",
    };
  }, [previewIframeWrapperStyles]);

  return { previewIframeWrapperStyles, previewIframeStyles };
}
