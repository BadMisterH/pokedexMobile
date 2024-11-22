import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemdText } from "./components/ThemdText";
import { UseThemeColors } from "@/hooks/UseThemeColors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Card } from "./components/Card";
import { FlatList } from "react-native-gesture-handler";
import { PokemonCard } from "./components/pokemon/PokemonCard";
import { useInfinteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from "./functions/pokemon";
import { useState } from "react";
import { Row } from "./components/Row";
import { SearchBar } from "./components/SearchBar";
import { SortButton } from "./components/SortButton";

interface PokemonResult {
  name: string;
  url: string;
}

export default function Index() {
  const colors = UseThemeColors();
  const { data, isFetching, fetchNextPage } =
    useInfinteFetchQuery("/pokemon?limit=21");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id") // type de useState ID ou Name


  const pokemons = data?.pages.flatMap((page) => 
    page.results.map((r : any) => ({
      name: r.name,
      id: getPokemonId(r.url)
    }))
  ) ?? [];


  const filteredPokemon = [
    ...(search
    ? pokemons.filter(
        (p) =>
          p.name.includes(search.toLowerCase()) ||
          p.id.toString() === search,
      )
    : pokemons),].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1))


  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.tint }]}
      >
        <Row style={styles.header} gap={16}>
          <Image
            source={require("@/assets/images/Pokeball.png")}
            width={24}
            height={24}
          />
          <ThemdText style={{color : "white", fontWeight : "bold"}} variant="headline" color="grayDark">
            Pokedex
          </ThemdText>
        </Row>

        {/* search bar */}
        <Row gap={16} style={styles.form}>
          <SearchBar value={search} onChange={setSearch} />
          <SortButton value={sortKey} onChange={setSortKey} />
        </Row>

        <Card style={styles.body}>
          <FlatList
            data={filteredPokemon}
            numColumns={3}
            contentContainerStyle={[styles.gridGap, styles.list]}
            columnWrapperStyle={styles.gridGap}
            onEndReached={search ? undefined : () => fetchNextPage()}
            ListFooterComponent={
              isFetching ? <ActivityIndicator color={colors.tint} /> : null
            }
            renderItem={({ item }) => (
              <PokemonCard
                id={item.id}
                name={item.name}
                style={{ flex: 1 / 3 }}
              ></PokemonCard>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4 },
  header: {
    paddingHorizontal: 12,
    paddingBottom : 8
  },
  body: {
    flex: 1,
    marginTop: 16,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
  form : {
    paddingHorizontal : 12
  }
});
