import { StyleSheet, Pressable, useColorScheme } from "react-native";
import {
  BottomTabInset,
  Colors,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { ThemedText } from "../themed-text";

type Props = { title: string };

export function NeoButton(props: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <Pressable style={[styles.container, { backgroundColor: colors.button }]}>
      <ThemedText>{props.title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    height: 50,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 4,
  },
});
