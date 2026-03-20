import * as ImagePicker from "expo-image-picker";
import { notify } from "@/lib/notify";
import type { PickedImage } from "./types";

function toPickedImage(asset: ImagePicker.ImagePickerAsset): PickedImage {
  const name =
    asset.fileName || asset.uri.split("/").pop() || `image-${Date.now()}.jpg`;

  const type = asset.mimeType || "image/jpeg";

  return { uri: asset.uri, name, type };
}

export async function pickImageFromLibrary(): Promise<PickedImage | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    notify("Autorisation d'accès aux photos requise.", "Permission");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled || !result.assets[0]) return null;

  return toPickedImage(result.assets[0]);
}
