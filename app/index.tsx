import * as React from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Plus, RefreshCw, Search } from "lucide-react-native";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "@/components/posts/PostCard";
import { PostDetailsModal } from "@/components/posts/PostDetailsModal";
import { UpdateImageModal } from "@/components/posts/UpdateImageModal";
import { DeletePostModal } from "@/components/posts/DeletePostModal";
import { pickImageFromLibrary } from "@/lib/posts/image-picker";
import type { Post } from "@/lib/posts/types";
import { Button, IconButton } from "@/components/ui/Button";
import { theme } from "@/styles/theme";

function filterPosts(posts: Post[], input: string) {
  if (!input.trim()) return posts;
  const lower = input.trim().toLowerCase();

  return posts.filter(
    (post) =>
      (post.title && post.title.toLowerCase().includes(lower)) ||
      (post.description && post.description.toLowerCase().includes(lower)),
  );
}

export default function Index() {
  const router = useRouter();
  const query = usePosts();
  const [search, setSearch] = React.useState("");

  const filteredPosts = React.useMemo(
    () => filterPosts(query.posts, search),
    [query.posts, search],
  );

  const onPickUpdateImage = React.useCallback(async () => {
    const picked = await pickImageFromLibrary();
    if (picked) query.setUpdateImage(picked);
  }, [query]);

  const renderHeader = () => (
    <View style={styles.headerWrapper}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.title}>Posts</Text>
          <Text style={styles.subtitle}>Gérez vos publications.</Text>
        </View>
        <View style={styles.headerActions}>
          <IconButton
            onPress={() => router.push("/create")}
            icon={<Plus size={16} color={theme.colors.text} />}
          />
          <IconButton
            onPress={query.refresh}
            disabled={query.busy}
            icon={<RefreshCw size={16} color={theme.colors.text} />}
          />
        </View>
      </View>

      <View style={styles.searchRow}>
        <Search size={16} color={theme.colors.muted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Recherche par titre ou description..."
          placeholderTextColor={theme.colors.muted}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionLabel}>Liste des posts</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#E8F1FF", "#F4F7FB", "#F9FAFB"]}
        style={StyleSheet.absoluteFill}
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onDetails={query.setDetails}
            onUpdateImage={(post) => {
              query.setUpdateTarget(post);
              query.setUpdateImage(null);
            }}
            onDelete={query.setDeleteTarget}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aucun post pour le moment.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={query.refreshing}
            onRefresh={query.refresh}
            tintColor={theme.colors.primary}
          />
        }
      />

      <PostDetailsModal
        post={query.details}
        open={!!query.details}
        onClose={() => query.setDetails(null)}
      />

      <UpdateImageModal
        open={!!query.updateTarget}
        target={query.updateTarget}
        previewUri={query.updateImage?.uri ?? null}
        busy={query.busy}
        onPickImage={onPickUpdateImage}
        onClearImage={() => query.setUpdateImage(null)}
        onClose={() => {
          query.setUpdateTarget(null);
          query.setUpdateImage(null);
        }}
        onSubmit={query.submitUpdateImage}
      />

      <DeletePostModal
        open={!!query.deleteTarget}
        target={query.deleteTarget}
        busy={query.busy}
        onCancel={() => query.setDeleteTarget(null)}
        onConfirm={query.confirmDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  headerWrapper: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
  },
  emptyState: {
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: theme.colors.muted,
  },
});
