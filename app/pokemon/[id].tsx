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
import { PokemonStat } from "../components/pokemon/PokemonStat";
import { basePokemonStat } from "../functions/pokemon";
import { Audio } from "expo-av";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";

type PokemonType = keyof typeof Colors.type; // Assuming Colors.type has all the type keys

export default function Pokemon () {
    const params = useLocalSearchParams() as {id:string}
    const [id, setId] = useState(parseInt(params.id, 10)); 
    const offset = useRef(1); //sauvegarde une reference
    const pager = useRef<PagerView>(null)

    const onPageSelected = (e: {nativeEvent : {position: number}}) => {
        offset.current = e.nativeEvent.position - 1
    }

    const onPageScrollStateChanged = (e: {nativeEvent: {pageScrollState: string}}) => {

        if(e.nativeEvent.pageScrollState !== 'idle'){
            return;
        }
        if(offset.current === -1 && id === 2){
            return; // idem mais pour le premier
        }

        if(offset.current === 1 && id === 150){
            return; // pour pas depacer apres le 151 pokemon
        }

        if(offset.current != 0){
            setId(id + offset.current)
            offset.current = 0
            pager.current?.setPageWithoutAnimation(1)
        }
    }

    const onNext = () => {
        pager.current?.setPage(2 + offset.current)
    }

    const onPrevious = () => {
        pager.current?.setPage(0)
    }

    return (<PagerView ref={pager}
    onPageSelected={onPageSelected}
    onPageScrollStateChanged={onPageScrollStateChanged}
    initialPage={1} style={{flex : 1}}>
        <PokemonView key={id - 1} id={id - 1} onNext={onNext} onPrevious={onPrevious}/>
        <PokemonView key={id} id={id} onNext={onNext} onPrevious={onPrevious}/>
        <PokemonView key={id + 1} id={id + 1} onNext={onNext} onPrevious={onPrevious}/>
    </PagerView> 
    );
}

type Props = {
    id:number,
    onPrevious : () => void,
    onNext : () => void
}

function PokemonView({id, onNext, onPrevious}:Props) {
  const colors = UseThemeColors();
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: id }); //recupere la liste des pokemons dans l'api (appel api)
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id: id,
  }); //recupere la liste des pokemons dans l'api

  const mainType = pokemon?.types?.[0].type.name as PokemonType | undefined;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replaceAll("\n", ". ");

  const stats = pokemon?.stats ?? basePokemonStat;

  //   console.log(mainType, colorType);

  const onImagePress = async () => {
    const cry = pokemon?.cries.latest;

    if (!cry) {
      return;
    }
    const { sound } = Audio.Sound.createAsync(
      {
        uri: cry,
      },
      { shouldPlay: true }
    );
    sound.playAsync();
  };


  const isFirst = id === 1;
  const isLast = id === 151;

  console.log(bio);

  return (
    <RootView backgroundColor={colorType}>
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
            #{id.toString().padStart(3, "0")}
          </ThemdText>
        </Row>

        <Card style={[styles.card, {overflow: 'visible',}]}>
          <Row style={styles.imageRow}>
            {isFirst ? (
              <View style={{ width: 24, height: 24 }}></View>
            ) : (
              <Pressable onPress={onPrevious}>
                <Image
                  width={24}
                  height={24}
                  source={require("@/assets/images/prev.png")}
                ></Image>
              </Pressable>
            )}
            <Pressable onPress={onImagePress}>
              <Image
                style={styles.artwork}
                source={{
                  uri: getPokemonArtwork(id),
                }}
                width={200}
                height={200}
              />
            </Pressable>
            {isLast ? (
              <View style={{ width: 24, height: 24 }}></View>
            ) : (
              <Pressable onPress={onNext}>
                <Image
                  width={24}
                  height={24}
                  source={require("@/assets/images/next.png")}
                ></Image>
              </Pressable>
            )}
          </Row>
          <Row gap={16} style={{ height: 20 }}>
            {types.map((type) => (
              <PokemonType name={type.type.name} key={type.type.name} />
            ))}
          </Row>
          <ThemdText variant="subtitle1" style={{ color: colorType }}>
            About
          </ThemdText>
          <Row>
            <PokemonSpec
              style={{
                borderStyle: "solid",
                borderRightWidth: 10,
                borderColor: colors.grayWhite,
              }}
              title={formatWeigh(pokemon?.weight)}
              description="Weight"
              image={require("@/assets/images/Weight.png")}
            />
            <PokemonSpec
              title={formatWeigh(pokemon?.height)}
              description="Size"
              image={require("@/assets/images/Size.png")}
            />
            <PokemonSpec
              title={pokemon?.moves
                .slice(0, 2)
                .map((m) => m.move.name)
                .join("\n")}
              description="Moves"
            />
          </Row>
          <ThemdText children={bio}></ThemdText>

          <ThemdText variant="subtitle1" style={{ color: colorType }}>
            Base stats
          </ThemdText>

          <View style={{ alignSelf: "stretch" }}>
            {stats.map((stat) => (
              <PokemonStat
                key={stat.stat.name}
                name={stat.stat.name}
                value={stat.base_stat}
                color={colorType}
              />
            ))}
          </View>
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

  imageRow: {
    position: "absolute",
    top: -140,
    zIndex: 2,
    justifyContent: "space-between",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  artwork: {},

  card: {
    marginTop: 144,
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 16,
    alignItems: "center",
    paddingBottom: 20,
  },
});
