import {
  Image,
  type ViewStyle,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { Card } from "../Card";
import { ThemdText } from "../ThemdText";
import { UseThemeColors } from "@/hooks/UseThemeColors";
import { Link } from "expo-router";
import { getPokemonArtwork } from "@/app/functions/pokemon";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export function PokemonCard({ style, id, name }: Props) {
  const colors = UseThemeColors();

  return (
    <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild>
      <Pressable style={style}>
        <Card style={[styles.card]}>
          <View
            style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
          ></View>
          <ThemdText style={styles.id} variant="caption" color="grayMedium">
            {id.toString().padStart(3, "0")}
          </ThemdText>
          {/* padStart() permet de rajouter des 0 au debut de l id */}
          <Image
            source={{
              uri: getPokemonArtwork(id),
            }}
            width={72}
            height={72}
          />
          <ThemdText style={{ textAlign: "center" }}>{name}</ThemdText>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 4,
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
  },
});
