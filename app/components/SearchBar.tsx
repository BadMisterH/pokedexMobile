import { View, TextInput, Image, StyleSheet } from "react-native"
import { Row } from "./Row"
import { UseThemeColors } from "@/hooks/UseThemeColors"

type Props = {
    value: string,
    onChange: (s: string) => void
}

export function SearchBar({ value, onChange }: Props) {

    const colors = UseThemeColors()
    return (
        <Row gap={8} style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}>
            <Image source={require('@/assets/images/search.png')} height={16} width={16} />
            <TextInput style={[styles.input, { color : "black" }]} onChangeText={onChange} value={value} />
        </Row>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12,
        backgroundColor: "white"
    },
    input: {
        flex: 1,
        height: 16,
        fontSize: 10,
        lineHeight: 16,
        backgroundColor: 'white', // Ajout de la couleur de fond blanche
        color : 'black'
    }
})