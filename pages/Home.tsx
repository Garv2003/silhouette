import React, { useState } from "react";
import { View, Image, ActivityIndicator, Text, StyleSheet } from "react-native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  ImagePickerResult,
} from "expo-image-picker";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { HomeScreenPropType } from "../types";
import { removeBackground, saveImageLocally } from "../helpers";

function Home(props: HomeScreenPropType) {
  const { navigation } = props;
  const [image, setImage] = useState<string | null>(null);
  const [cutout, setCutout] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const removeBackgroundOnConfirm = async (uri: string) => {
    try {
      setIsLoading(true);
      const base64Cutout = await removeBackground(uri);

      if (base64Cutout) {
        setCutout(base64Cutout);
        const cutoutUri = await saveImageLocally({
          fileName: "cutout.png",
          base64: base64Cutout,
        });
        navigation.navigate("Editor", { imageUri: uri, cutoutUri });
      } else {
        console.error("Failed to get cutout image.");
      }
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const result: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0.2,
    });

    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      setCutout(null);
      await removeBackgroundOnConfirm(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Remove background from image
      </Text>
      {image && !cutout && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {cutout && (
        <Image
          source={{ uri: `data:image/png;base64,${cutout}` }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {isLoading && <ActivityIndicator style={styles.loader} />}
      <Button onPress={pickImage} mt={20}>
        <ButtonText>Select image</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  loader: {
    marginTop: 20,
  },
});

export default Home;
