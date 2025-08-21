import { requireNativeModule } from "expo";
import { ScreenshotOptions } from "./ExpoScreenshot.types";

declare class ExpoScreenshotModule {
  makeScreenshot(viewTag: number, options: ScreenshotOptions): Promise<string>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoScreenshotModule>("ExpoScreenshot");
