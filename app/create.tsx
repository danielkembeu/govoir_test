import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { usePosts } from "@/hooks/usePosts";
import { CreatePostCard } from "@/components/posts/CreatePostCard";
import { pickImageFromLibrary } from "@/lib/posts/image-picker";
import { IconButton } from "@/components/ui/Button";
import { theme } from "@/styles/theme";

export default function CreateScreen() {
  const router = useRouter();
  const query = usePosts();

  const onPickImage = React.useCallback(async () => {
    const picked = await pickImageFromLibrary();

    if (picked) query.setNewImage(picked);
  }, [query]);

  const handleSubmit = React.useCallback(async () => {
    const ok = await query.submitCreate();

    if (ok) router.back();
  }, [query, router]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#E8F1FF", "#F4F7FB", "#F9FAFB"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.rowInHeader}>
            <IconButton
              onPress={() => router.back()}
              icon={<ArrowLeft size={16} color={theme.colors.text} />}
            />
            <View>
              <Text style={styles.title}>Nouveau post</Text>
              <Text style={styles.subtitle}>
                Publiez un contenu en une étape.
              </Text>
            </View>
          </View>
        </View>

        <CreatePostCard
          title={query.newTitle}
          description={query.newDescription}
          previewUri={query.newImage?.uri ?? null}
          busy={query.busy}
          onTitleChange={query.setNewTitle}
          onDescriptionChange={query.setNewDescription}
          onPickImage={onPickImage}
          onClearImage={() => query.setNewImage(null)}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  rowInHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.muted,
  },
});
