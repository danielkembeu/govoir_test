import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { ImagePickerField } from "./ImagePickerField";
import { theme } from "@/styles/theme";

interface Props {
  title: string;
  description: string;
  previewUri?: string | null;
  busy: boolean;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onPickImage: () => void;
  onClearImage: () => void;
  onSubmit: () => void;
}

export function CreatePostCard({
  title,
  description,
  previewUri,
  busy,
  onTitleChange,
  onDescriptionChange,
  onPickImage,
  onClearImage,
  onSubmit,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Nouveau post</Text>
        <Text style={styles.subtitle}>Titre, description et image requis.</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Titre</Text>
        <TextInput
          value={title}
          onChangeText={onTitleChange}
          placeholder="Ex: Roadmap Q2"
          placeholderTextColor={theme.colors.muted}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={onDescriptionChange}
          placeholder="Détaillez votre contenu..."
          placeholderTextColor={theme.colors.muted}
          style={[styles.input, styles.textarea]}
          multiline
          textAlignVertical="top"
        />
      </View>

      <ImagePickerField
        label="Image"
        previewUri={previewUri}
        onPick={onPickImage}
        onClear={onClearImage}
      />

      <Button
        label={busy ? "Création..." : "Créer le post"}
        onPress={onSubmit}
        disabled={busy}
        loading={busy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    // ...theme.shadow.card,
  },
  header: {
    gap: 4,
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
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.text,
  },
  textarea: {
    minHeight: 90,
  },
});
