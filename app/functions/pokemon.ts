export function getPokemonId (url: string): number {
    return parseInt(url.split('/').at(-2)!, 10) // ça existe "!"" 
}

//Recuperer l'ide dans l'url de pokeapi

export function getPokemonArtwork(id: number | string): string {
 return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}


export function formatWeigh(weight ?: number): string {
    if(!weight){
        return ""
    }else{
        return (weight / 10).toString().replace('.', ',') + 'kg'
    }
}

export function formaSize(size ?: number): string {
    if(!size){
        return ""
    }else{
        return (size / 10).toString().replace('.', ',') + 'm'
    }
}