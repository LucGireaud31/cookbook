import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "../../../theme/colors";
import { wrapText } from "../../../utils/string";

interface IngredientButtonProps {
  name: string;
  image: string;
  onPress?(): void;
  isSelected: boolean;
  isRecipe?: boolean;
  backgroundColor?: string;
}

export function IngredientButton({
  name,
  image,
  onPress,
  isRecipe,
  isSelected,
  backgroundColor,
}: IngredientButtonProps) {
  return (
    <TouchableOpacity
      onPress={(e) => {
        e.stopPropagation();
        onPress?.();
      }}
    >
      <View
        style={[
          styles.ingredient,
          isSelected
            ? {
                backgroundColor: !isRecipe ? theme[400] : undefined,
              }
            : {
                opacity: isRecipe ? 0.8 : 1,
              },
        ]}
      >
        <Image
          style={isRecipe ? styles.recipeIcon : styles.ingredientIcon}
          source={{ uri: image }}
        />
        <Text
          style={
            isRecipe
              ? styles.recipeLabel
              : {
                  ...styles.ingredientLabel,
                  ...(isSelected && { color: "white" }),
                }
          }
        >
          {wrapText(name, 20)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 163,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: theme[400],
  },
  input: { height: 30, borderWidth: 0 },
  icon: { position: "absolute", right: 5, top: 6 },
  ingredientsContainer: {
    borderTopWidth: 1,
    borderColor: theme[400],
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  ingredient: {
    height: 100,
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingHorizontal: 1,
  },
  ingredientIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  ingredientLabel: {
    color: theme[400],
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  recipeIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  recipeLabel: {
    color: "white",
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
    position: "absolute",
    bottom: 5,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: theme[400],
  },
});
