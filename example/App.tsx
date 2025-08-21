import ExpoScreenshot from "expo-screenshot";
import { useRef, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function App() {
  const ref = useRef<View>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Async functions">
          <Button
            title="Set value"
            onPress={async () => {
              if (!ref.current) return;
              await ExpoScreenshot.makeScreenshot(ref)
                .then(setPreview)
                .catch((error) => {
                  console.error("Error taking screenshot:", error);
                });
            }}
          />
        </Group>

        <Group name="Preview">
          <Image
            source={{ uri: preview }}
            resizeMode="contain"
            style={{ width: "100%", aspectRatio: 1, backgroundColor: "gray" }}
          />
        </Group>

        <Group name="Test view">
          <View
            ref={ref}
            style={{
              backgroundColor: "red",
              paddingVertical: 100,
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            collapsable={false}
          >
            <View
              style={{ width: 50, height: 50, backgroundColor: "blue" }}
              collapsable={false}
            />
            <Text>Test view content</Text>
          </View>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
};
