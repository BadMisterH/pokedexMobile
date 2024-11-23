import { useLocalSearchParams, router } from "expo-router";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { RootView } from "../components/RootView";
import { Row } from "../components/Row";
import { ThemdText } from "../components/ThemdText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { Colors } from "../constants/Colors";
import { UseThemeColors } from "@/hooks/UseThemeColors";
import { formatWeigh, getPokemonArtwork } from "../functions/pokemon";
import { Card } from "../components/Card";
import { PokemonType } from "../components/pokemon/PokemonType";
import { PokemonSpec } from "../components/pokemon/PokemonSpec";

type PokemonType = keyof typeof Colors.type; // Assuming Colors.type has all the type keys

export default function Pokemon() {
  const colors = UseThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id }); //recupere la liste des pokemons dans l'api (appel api)
  const { data: species } = useFetchQuery("/pokemon-species/[id]", { id: params.id }); //recupere la liste des pokemons dans l'api
  const mainType = pokemon?.types?.[0].type.name as PokemonType | undefined;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries?.find(({ language }) => language.name === "en")?.flavor_text.replaceAll("\n", ". ");

//   console.log(mainType, colorType);

console.log(bio)

  return (
    <RootView style={{ backgroundColor: colorType }}>
      <View>
        <Image
          style={styles.pokeball}
          source={require("@/assets/images/PokeballOpac.png")}
          width={208}
          height={208}
        ></Image>
        <Row gap={8} style={styles.header}>
          <Pressable onPress={router.back}>
            <Row>
              <Image
                source={require("@/assets/images/Return.png")}
                width={32}
                height={32}
              />
              <ThemdText
                color="grayWhite"
                variant="headline"
                style={{ textTransform: "capitalize" }}
              >
                {pokemon?.name}
              </ThemdText>
            </Row>
          </Pressable>
          <ThemdText color="grayWhite" variant="subtitle2">
            #{params.id.padStart(3, "0")}
          </ThemdText>
        </Row>
        <View style={styles.body}>
          {" "}
          <Image
            style={styles.artwork}
            source={{
              uri: getPokemonArtwork(params.id),
            }}
            width={200}
            height={200}
          />
        </View>
        <Card style={styles.card}>
          <Row gap={16}>
            {types.map((type) => (
              <PokemonType name={type.type.name} key={type.type.name} />
            ))}
          </Row>
          <ThemdText variant="subtitle1" style={{ color: colorType }}>
            About
          </ThemdText>
          <Row>
            <PokemonSpec style={{borderStyle: "solid", borderRightWidth: 10, borderColor: colors.grayWhite}} title={formatWeigh(pokemon?.weight)} description="Weight" image={require("@/assets/images/Weight.png")} />
            <PokemonSpec title={formatWeigh(pokemon?.height)} description="Size" image={require("@/assets/images/Size.png")} />
            <PokemonSpec title={pokemon?.moves.slice(0, 2).map((m) => m.move.name).join("\n")} description="Moves" />
          </Row>
          <ThemdText children={bio}></ThemdText>

          <ThemdText variant="subtitle1" style={{ color: colorType }}>
            Base stats
          </ThemdText>
        </Card>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    opacity: 0.1,
    position: "absolute",
    right: 8,
    top: 8,
  },
  artwork: {
    position: "absolute",
    alignSelf: "center",
    top: -140,
    zIndex: 2,
  },
  body: {
    marginTop: 144,
  },

  card: {
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 16,
    alignItems: "center",
  },
});
