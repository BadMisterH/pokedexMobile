import {
  ImageSourcePropType,
  StyleSheet,
  Image,
  View,
  type ViewProps,
} from "react-native";
import { Row } from "../Row";
import { ThemdText } from "../ThemdText";

type Props = ViewProps & {
  title?: string; // ? veut dire string ou undefined
  description?: string;
  image?: ImageSourcePropType;
};

export function PokemonSpec({
  style,
  image,
  title,
  description,
  ...rest
}: Props) {
  return (
    <View style={[style, styles.root]} {...rest}>
      <ThemdText variant="caption" color="grayMedium">
        {description}
      </ThemdText>
      <Row style={styles.row}>
        {image && <Image source={image} width={16} height={16}></Image>}
        <ThemdText>{title}</ThemdText>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: "center",
    alignSelf: "center",
  },
  row: {
    height: 32,
    alignItems: "center",
  },
});
