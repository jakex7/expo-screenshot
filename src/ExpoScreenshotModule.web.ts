import { registerWebModule, NativeModule } from 'expo';

import { ExpoScreenshotModuleEvents } from './ExpoScreenshot.types';

class ExpoScreenshotModule extends NativeModule<ExpoScreenshotModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoScreenshotModule, 'ExpoScreenshotModule');
