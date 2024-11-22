import { useColorScheme } from "react-native";
import {Colors} from "../app/constants/Colors";

export function UseThemeColors () {
    const theme = useColorScheme() ?? "light" ;
    return Colors[theme]; 
    
}