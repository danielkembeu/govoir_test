import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { ImageIcon } from "lucide-react-native";
import type { Post } from "@/lib/posts/types";
import { formatPostDate } from "@/lib/posts/format-post-date";
import { Button } from "@/components/ui/Button";
import { theme } from "@/styles/theme";

interface Props {
  post: Post | null;
  open: boolean;
  onClose: () => void;
}

export function PostDetailsModal({ post, open, onClose }: Props) {
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.hero}>
            {post?.image_url ? (
              <Image
                source={{ uri: post.image_url }}
                style={styles.heroImage}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <View style={styles.heroPlaceholder}>
                <ImageIcon size={32} color={theme.colors.muted} />
              </View>
            )}
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{post?.title}</Text>
            <Text style={styles.date}>
              {post ? formatPostDate(post.created_at) : ""}
            </Text>
            {post?.description ? (
              <ScrollView style={styles.descriptionBox}>
                <Text style={styles.description}>{post.description}</Text>
              </ScrollView>
            ) : null}
            <Button label="Fermer" onPress={onClose} />
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
    overflow: "hidden",
  },
  hero: {
    height: 200,
    backgroundColor: theme.colors.surfaceAlt,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  date: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  descriptionBox: {
    maxHeight: 160,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    padding: theme.spacing.sm,
  },
  description: {
    fontSize: 13,
    color: theme.colors.text,
    lineHeight: 18,
  },
});
