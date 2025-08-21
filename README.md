# expo-screenshot

Capture screenshots of React Native views.

## Installation

```bash
yarn add expo-screenshot
```

## Usage

```tsx
import ExpoScreenshot from "expo-screenshot";
import { useRef } from "react";
import { View, Text } from "react-native";

export default function App() {
  const viewRef = useRef<View>(null);

  const takeScreenshot = async () => {
    const result = await ExpoScreenshot.makeScreenshot(viewRef);
  };

  return (
    <View>
      <View
        ref={viewRef}
        style={{
          backgroundColor: "red",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text>This view will be captured!</Text>
      </View>
    </View>
  );
}
```

## API

### `makeScreenshot(ref, options?)`

Captures a screenshot of the specified view.

#### Parameters

| Parameter | Type                    | Description                                             |
| --------- | ----------------------- | ------------------------------------------------------- |
| `ref`     | `React.RefObject<View>` | Reference to the React Native View component to capture |
| `options` | `ScreenshotOptions`     | Optional configuration object                           |

#### Returns

`Promise<string>` - Returns a promise that resolves to the screenshot data based on the output format specified in options.

#### Options

| Property | Type                              | Default     | Description                      |
| -------- | --------------------------------- | ----------- | -------------------------------- |
| `output` | `"file" \| "base64" \| "dataUri"` | `"dataUri"` | Output format for the screenshot |

### Output Formats

#### `"file"`

Returns a file URI pointing to the temporary screenshot file. _\*not implemented yet_

#### `"base64"`

Returns the screenshot as a base64 encoded string.

#### `"dataUri"`

Returns the screenshot as a data URI (base64 with MIME type prefix).

## License

[MIT](https://github.com/jakex7/expo-screenshot/blob/main/LICENSE)

### Made with ♥️ by Jakub Grzywacz
