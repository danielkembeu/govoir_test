import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { ImageIcon } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { theme } from "@/styles/theme";

interface Props {
  label: string;
  previewUri?: string | null;
  fallbackUri?: string | null;
  onPick: () => void;
  onClear?: () => void;
}

export function ImagePickerField({
  label,
  previewUri,
  fallbackUri,
  onPick,
  onClear,
}: Props) {
  const source = previewUri || fallbackUri || null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <Button
        label={source ? "Changer l'image" : "Choisir une image"}
        onPress={onPick}
        variant="outline"
      />

      {source ? (
        <View style={styles.preview}>
          <Image
            source={{ uri: source }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        </View>
      ) : (
        <View style={[styles.preview, styles.empty]}>
          <ImageIcon size={22} color={theme.colors.muted} />
          <Text style={styles.emptyText}>Aperçu de l'image</Text>
        </View>
      )}

      {source && onClear ? (
        <Button
          label="Retirer la sélection"
          onPress={onClear}
          variant="ghost"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
  },
  preview: {
    height: 160,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  empty: {
    gap: 6,
  },
  emptyText: {
    fontSize: 12,
    color: theme.colors.muted,
  },
});
