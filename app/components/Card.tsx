import { type ViewProps, type ViewStyle, View } from "react-native";
import { Shadows } from "../constants/Shadow";
import { UseThemeColors } from "@/hooks/UseThemeColors";

type Props = ViewProps

export function Card ({style, ...reset}: Props) {
    const colors = UseThemeColors()
    return <View style={[styles, {backgroundColor: colors.grayWhite}, style]} {...reset} />
}

const styles = {
    borderRadius: 0,
    overflow : 'hidden',
    ...Shadows.dp2
} satisfies ViewStyle