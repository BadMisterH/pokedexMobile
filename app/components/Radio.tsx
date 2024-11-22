import { UseThemeColors } from "@/hooks/UseThemeColors"
import { StyleSheet } from "react-native"
import { View } from "react-native"

type Props = {
    checked: boolean
}

export function Radio ({checked}: Props) {
    const colors = UseThemeColors()
    return <View>
        {checked && <View style={[styles.radioInner, {backgroundColor : colors.tint}]} />}
    </View>
}

const styles = StyleSheet.create({
    radio : {
        width : 14,
        height : 14,
        borderStyle : 'solid',
        borderWidth: 1,
        borderRadius : 14,
        alignItems: "center",
        justifyContent : "center"

    }, //cercle extérieure
    radioInner : {
        borderRadius : 6,
        width : 6,
        height : 6,

    } //cercle interieure
})