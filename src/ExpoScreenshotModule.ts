import { NativeModule, requireNativeModule } from 'expo';

import { ExpoScreenshotModuleEvents } from './ExpoScreenshot.types';

declare class ExpoScreenshotModule extends NativeModule<ExpoScreenshotModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoScreenshotModule>('ExpoScreenshot');
