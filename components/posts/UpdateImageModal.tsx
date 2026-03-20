import { Modal, StyleSheet, Text, View } from "react-native";
import type { Post } from "@/lib/posts/types";
import { ImagePickerField } from "./ImagePickerField";
import { Button } from "@/components/ui/Button";
import { theme } from "@/styles/theme";

interface Props {
  open: boolean;
  target: Post | null;
  previewUri?: string | null;
  busy: boolean;
  onPickImage: () => void;
  onClearImage: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function UpdateImageModal({
  open,
  target,
  previewUri,
  busy,
  onPickImage,
  onClearImage,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Mettre à jour l'image</Text>
          {target ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {target.title}
            </Text>
          ) : null}

          <ImagePickerField
            label="Nouvelle image"
            previewUri={previewUri}
            fallbackUri={target?.image_url || null}
            onPick={onPickImage}
            onClear={onClearImage}
          />

          <View style={styles.actions}>
            <Button
              label="Annuler"
              onPress={onClose}
              variant="ghost"
              disabled={busy}
            />
            <Button
              label={busy ? "Mise à jour..." : "Mettre à jour"}
              onPress={onSubmit}
              disabled={busy}
              loading={busy}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
});
