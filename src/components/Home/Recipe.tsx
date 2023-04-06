import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import { gray, theme } from "../../theme/colors";
import { TRecipeItem } from "../../types/recipe";
import { StarInput } from "../shared/StarInput";

interface RecipeProps {
  recipe: TRecipeItem;
}

export function Recipe(props: RecipeProps) {
  const { recipe } = props;

  const navigation = useNavigation();

  async function onRecipePress() {
    navigation.navigate("recipePage", {
      id: recipe.id,
      name: recipe.name,
    });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onRecipePress}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: recipe.image }} />
      </View>
      <Text style={styles.label}>{recipe.name}</Text>
      <StarInput size={15} note={recipe.note} isDisabled={true} />
    </TouchableOpacity>
  );
}

const recipeWidth = Dimensions.get("window").width / 3 - 10;

const styles = StyleSheet.create({
  container: {
    width: recipeWidth,
    alignItems: "center",
    marginVertical: 15,
  },

  labelContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  heartAndLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: theme[400],
    fontWeight: "800",
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
  clickable: {
    height: 120,
    marginTop: 8,
    flexDirection: "row",
  },
  imageContainer: {
    width: recipeWidth * 0.8,
    height: recipeWidth * 0.8,
    backgroundColor: theme[400],
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
    resizeMode: "contain",
  },
  dataContainer: {
    backgroundColor: theme[400],
    height: "100%",
    width: "70%",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dataHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeImage: {
    resizeMode: "contain",
    width: 20,
    height: 20,
    marginRight: 5,
  },
  headerItem: {
    fontWeight: "700",
    fontSize: 15,
  },
  bataBody: {
    flex: 1,
    justifyContent: "space-between",
  },
  tagsContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    fontSize: 11,
    color: gray[500],
    textAlign: "right",
  },
});
