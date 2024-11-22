export function getPokemonId (url: string): number {
    return parseInt(url.split('/').at(-2)!, 10) // ça existe "!"" 
}

//Recuperer l'ide dans l'url de pokeapi