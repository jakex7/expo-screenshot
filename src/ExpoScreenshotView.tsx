import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoScreenshotViewProps } from './ExpoScreenshot.types';

const NativeView: React.ComponentType<ExpoScreenshotViewProps> =
  requireNativeView('ExpoScreenshot');

export default function ExpoScreenshotView(props: ExpoScreenshotViewProps) {
  return <NativeView {...props} />;
}
