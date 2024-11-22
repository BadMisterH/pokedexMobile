import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
const endpoint = "https://pokeapi.co/api/v2/"

export function useFetchQuery(path: string) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            await wait(1)
            return fetch(endpoint + path).then(r => r.json())
            //Lien + le chemin est renvoie une reponse en format json
        }
    })
}


export function useInfinteFetchQuery (path: string) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path,
        queryFn: async ({pageParam}) => {
            await wait(1)
            return fetch(pageParam, {
                headers : {
                    Accept : "application/json"
                }
            }).then(r => r.json())
        },

        getNextPageParam: (lastPAge) => {
            if("next" in lastPAge) {
                return lastPAge.next
            }else{
                return null
            }
        }

    })
}


function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000))
}