import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Eye, ImageIcon, Trash2 } from "lucide-react-native";
import type { Post } from "@/lib/posts/types";
import { formatPostDate } from "@/lib/posts/format-post-date";
import { IconButton } from "@/components/ui/Button";
import { theme } from "@/styles/theme";

interface Props {
  post: Post;
  onDetails: (post: Post) => void;
  onUpdateImage: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export function PostCard({ post, onDetails, onUpdateImage, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {post.image_url ? (
          <Image
            source={{ uri: post.image_url }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <ImageIcon size={28} color={theme.colors.muted} />
          </View>
        )}
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{formatPostDate(post.created_at)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {post.title}
        </Text>
        {post.description ? (
          <Text numberOfLines={2} style={styles.description}>
            {post.description}
          </Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        <IconButton
          onPress={() => onDetails(post)}
          icon={<Eye size={16} color={theme.colors.text} />}
        />
        <IconButton
          onPress={() => onUpdateImage(post)}
          icon={<ImageIcon size={16} color={theme.colors.text} />}
        />
        <IconButton
          variant="danger"
          onPress={() => onDelete(post)}
          icon={<Trash2 size={16} color={theme.colors.danger} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    // ...theme.shadow.card,
  },
  imageWrapper: {
    height: 160,
    backgroundColor: theme.colors.surfaceAlt,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dateBadge: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  dateText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
  },
  description: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
});
