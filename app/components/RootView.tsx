import { UseThemeColors } from "@/hooks/UseThemeColors";
import { useEffect } from "react";
import { View, type ViewProps, type ViewStyle, SafeAreaView } from "react-native";
import Animated, { ReduceMotion, Easing ,interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Props = ViewProps & {
    backgroundColor?: string
}

export function RootView ({style, backgroundColor, ...rest}: Props) {
    const colors = UseThemeColors();
    const progress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0, 1],
                [colors.tint, backgroundColor ?? colors.tint]
            )
        }

    }, [backgroundColor])

    useEffect(() => {
        if(backgroundColor) {
            progress.value = 0;
           progress.value = withTiming(1, {
                duration : 700,
                easing: Easing.out(Easing.quad),
                reduceMotion: ReduceMotion.System
            })
        }


    }, [backgroundColor])

    if(!backgroundColor){
        return (
            <SafeAreaView
            style={[rootStyle, { backgroundColor: colors.tint }, style]} {...rest}
          />
    
        )
    }

    return <Animated.View style={[{flex: 1}, animatedStyle, style]} >
        <SafeAreaView style={rootStyle} {...rest} />
    </Animated.View>


}


const rootStyle = {
    flex: 1,
    padding: 4

} satisfies ViewStyle