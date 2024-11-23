import { type ViewStyle, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { ThemdText } from "../ThemdText";



type Props = {
    name : keyof (typeof Colors)["type"];
}

export function PokemonType({name} : Props) {
    return <View style={[rootStyle, {backgroundColor: Colors.type[name]}]}>
        <ThemdText color="grayWhite" variant="subtitle3" style={{textTransform: "capitalize"}}>{name}</ThemdText>

    </View>
}

const rootStyle = {
    flex : 0,
    height: 20,
    paddingHorizontal : 8,
    borderRadius : 8,
} satisfies ViewStyle