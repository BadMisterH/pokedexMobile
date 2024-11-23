type ThemeColors = {
  tint: string;
  grayDark: string;
  grayMedium: string;
  grayLight: string;
  grayBackground: string;
  grayWhite: string;
  [key: string]: string;
};

type TypeColors = {
  bug: string;
  water : string,
  dark: string;
  dragon: string;
  poison: string;
  electric: string;
  fairy: string;
  fighting: string;
  fire: string;
  flying: string;
  ghost: string;
  normal: string;
  grass: string;
};

type ColorsType = {
  light: ThemeColors;
  dark: ThemeColors;
  type: TypeColors;
};

export const Colors: ColorsType = {
  light: {
    tint: "#DC0A2D",
    grayDark: "#212121",
    grayMedium: "#666666",
    grayLight: "#E0E0E0",
    grayBackground: "#EFEFEF",
    grayWhite: "#FFFFFF",
  },
  dark: {
    tint: "#DC0A2D",
    grayDark: "#212121",
    grayMedium: "#666666",
    grayLight: "#E0E0E0",
    grayBackground: "#EFEFEF",
    grayWhite: "#FFFFFF",
  },
  type: {
    bug: "#A7B723",
    water : "#0ebef8",
    dark: "#75574C",
    dragon: "#7037FF",
    poison : "#6a47c4",
    electric: "#F9CF30",
    fairy: "#E69EAC",
    fighting: "#C12239",
    fire: "#F57D31",
    flying: "#A891EC",
    ghost: "#70559B",
    normal: "#AAA67F",
    grass: "#74CB48",
  },
};

