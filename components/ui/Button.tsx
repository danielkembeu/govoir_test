import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { theme } from "@/styles/theme";

type Variant = "primary" | "ghost" | "outline" | "danger";

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  disabled,
  loading,
  variant = "primary",
  icon,
  style,
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        stylesByVariant[variant],
        pressed && !disabled && !loading && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={labelColors[variant]} />
        ) : (
          icon
        )}
        <Text style={[styles.label, { color: labelColors[variant] }]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

interface IconButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
  variant?: "ghost" | "danger";
}

export function IconButton({
  onPress,
  icon,
  disabled,
  variant = "ghost",
}: IconButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        variant === "danger" && styles.iconDanger,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const stylesByVariant = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  outline: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
});

const labelColors: Record<Variant, string> = {
  primary: "white",
  ghost: theme.colors.text,
  outline: theme.colors.text,
  danger: "white",
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.6,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconDanger: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: "#FCA5A5",
  },
});
