import * as React from 'react';

import { ExpoScreenshotViewProps } from './ExpoScreenshot.types';

export default function ExpoScreenshotView(props: ExpoScreenshotViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
