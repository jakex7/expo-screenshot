import React from "react";
import { findNodeHandle, View } from "react-native";
import ExpoScreenshotModule from "./ExpoScreenshotModule";
import { ScreenshotOptions } from "./ExpoScreenshot.types";

export const makeScreenshot = (
  ref: React.RefObject<View | null>,
  options?: ScreenshotOptions,
) => {
  if (!ref.current) throw new Error("Reference to the view is not set");

  const viewTag = findNodeHandle(ref.current);
  if (!viewTag) throw new Error("Failed to find the view tag");

  return ExpoScreenshotModule.makeScreenshot(viewTag, options);
};

export default {
  makeScreenshot,
};
