import { Modal, StyleSheet, Text, View } from "react-native";
import type { Post } from "@/lib/posts/types";
import { Button } from "@/components/ui/Button";
import { theme } from "@/styles/theme";

interface Props {
  open: boolean;
  target: Post | null;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeletePostModal({
  open,
  target,
  busy,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Supprimer ce post ?</Text>
          <Text style={styles.subtitle}>
            Cette action est irréversible.
            {target ? ` "${target.title}" sera définitivement supprimé.` : ""}
          </Text>
          <View style={styles.actions}>
            <Button
              label="Annuler"
              onPress={onCancel}
              variant="ghost"
              disabled={busy}
            />
            <Button
              label={busy ? "Suppression..." : "Supprimer"}
              onPress={onConfirm}
              variant="danger"
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
    color: theme.colors.danger,
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
