import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
const endpoint = "https://pokeapi.co/api/v2/"
import { Colors } from "@/app/constants/Colors";


type API = {
    "/pokemon/[id]": {
      moves: { move: { name: string } }[];
      stats: {
        base_stat: number;
        stat: {
          name: string;
        };
      }[];
      cries: {
        latest: string;
      };
      types: {
        type: {
          name: keyof (typeof Colors)["type"];
        };
      }[];
    };
  
    "/pokemon-species/[id]": {
      flavor_text_entries: {
        flavor_text: string;
      }[];
    };
  };
  

export function useFetchQuery(path: string, params?: Record<string, string | number>) {

    const localUrl = endpoint + Object.entries(params ?? {}).reduce((acc, [key, value]) => acc.replaceAll(`[${key}]`, String(value)), path);
    return useQuery({
        queryKey: [localUrl],
        queryFn: async () => {
            await wait(1)
            return fetch(localUrl).then(r => r.json())
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