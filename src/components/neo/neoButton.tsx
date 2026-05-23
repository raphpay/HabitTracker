import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "@/components/themed-text";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
};

export function NeoButton({
  title,
  onPress,
  variant = "primary",
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
    >
      <ThemedText type="smallBold" mode="principal">
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: 4,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 8,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowColor: "#000",
  },

  primary: {
    backgroundColor: "#00C2FF",
  },

  secondary: {
    backgroundColor: "#FFF",
  },

  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 2, height: 2 },
  },
});
