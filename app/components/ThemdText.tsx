import { StyleSheet, type TextProps, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { UseThemeColors } from "@/hooks/UseThemeColors";

const styles = StyleSheet.create({
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  headline: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
});

type Props = TextProps & {
  variant?: keyof typeof styles;
  color?: keyof typeof Colors["light"];
};

export function ThemdText({ variant, color, children, ...rest }: Props) {
  const colors = UseThemeColors();
  const textColor = color ? colors[color as keyof typeof Colors["light"]] : colors["light"];

  return (
    <Text
      style={[styles[variant ?? "body3"], { color: textColor }]}
      {...rest}
    >
      {children ?? ""}
    </Text>
  );
}
