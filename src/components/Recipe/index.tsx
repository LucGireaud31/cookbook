import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Provider } from "react-native-paper";
import { useNavigation } from "../../hooks/useNavigation";
import { useRecipe, useToggleRecipeNote } from "../../services/recipes";
import { background, red, theme } from "../../theme/colors";
import { StackComponent } from "../../types/reactNavigation";
import { RecipeQuantityTypeEnum } from "../../types/recipe";
import {
  formatIngredientName,
  formatIngredientQuantityLabel,
} from "../../utils/ingredientQuantityType";
import { roundNumber } from "../../utils/number";
import { toPlural, wrapText } from "../../utils/string";
import { MinusIcon, PencilIcon, PlusIcon } from "../icons/icons";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import { IconButton } from "../shared/IconButton";
import { ListItem } from "../shared/ListItem";
import { Modal } from "../shared/Modal";
import { StarInput } from "../shared/StarInput";
import { Tag } from "../shared/Tag";
import { Commentary } from "./Commentary";
import { RecipeAction } from "./RecipeActions";

interface RecipeProps extends StackComponent {
  isModal?: boolean;
}

export function Recipe(props: RecipeProps) {
  const { route, isModal = false } = props;

  const { data: recipe, query } = useRecipe(route?.params?.id ?? "");

  const noteMutation = useToggleRecipeNote();

  const navigation = useNavigation();

  const [quantityCpt, setQuantityCpt] = useState(1);
  const [note, setNote] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [dependencedRecipe, setDependencedRecipe] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (!recipe) {
      !isModal &&
        navigation.setOptions({
          title: wrapText(route?.params.name ?? "", 20),
        });

      return;
    }

    !isModal &&
      navigation.setOptions({
        title: wrapText(recipe.name, 20),
        headerRight: () => <RecipeAction recipe={recipe} />,
      });

    setQuantityCpt(recipe.quantity?.value ?? 1);
    setNote(recipe.note);
  }, [recipe]);

  if (!recipe) return null;

  function handleEditRecipe() {
    navigation.navigate("recipeEdit", { recipe });
  }

  function handleRedirectToRecipe(id: string, name: string) {
    setDependencedRecipe({ id, name });
    setIsOpen(true);
  }

  function handleNoteChange(newNote: number) {
    noteMutation(recipe!.id, newNote);
    setNote(newNote);
  }

  function onMinus() {
    if (quantityCpt > 1) setQuantityCpt(quantityCpt - 1);
  }

  function onPlus() {
    setQuantityCpt(quantityCpt + 1);
  }

  function formatRecipeQuantity() {
    return `${quantityCpt} ${
      recipe!.quantity!.type == RecipeQuantityTypeEnum.Personns
        ? toPlural("personne", quantityCpt)
        : toPlural(`${recipe?.name.split(" ")[0]}`, quantityCpt)
    }`;
  }

  return (
    <>
      <Container queryToRefetch={query} keyboardShouldPersistTaps="always">
        <View style={styles.header}>
          <View style={styles.top}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageProfil}
                source={{ uri: recipe.image }}
              />
            </View>
            <StarInput note={note} onChange={handleNoteChange} />
            {recipe.type && (
              <View style={styles.typeContainer}>
                <Image
                  source={{ uri: recipe.type?.image }}
                  style={styles.typeImage}
                />
                <Text style={styles.typeName}>{recipe.type?.name}</Text>
              </View>
            )}
          </View>
          {recipe.tags.length > 0 && (
            <ScrollView horizontal={true} style={styles.tagContainer}>
              {recipe.tags.map((tag, i) => (
                <Tag key={i} name={tag.name} color={tag.color} />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.ingredientHeader}>
            <Text style={styles.sectionLabel}>Ingrédients</Text>
            {recipe.quantity && recipe.quantity.value && (
              <View style={styles.doseContainer}>
                <IconButton
                  style={styles.doseIcon}
                  icon={<MinusIcon />}
                  onPress={onMinus}
                />
                <Text style={styles.doseLabel}>{formatRecipeQuantity()}</Text>
                <IconButton
                  style={styles.doseIcon}
                  icon={<PlusIcon />}
                  onPress={onPlus}
                />
              </View>
            )}
          </View>
          {recipe.ingredients.length > 0 || recipe.recipes.length > 0 ? (
            <View style={styles.sectionContent}>
              {recipe.recipes.map((ing) => (
                <TouchableOpacity
                  key={ing.id}
                  onPress={() => handleRedirectToRecipe(ing.id, ing.name)}
                >
                  <ListItem
                    key={ing.id}
                    label={ing.name}
                    leftIcon={
                      <Image
                        style={styles.imageRecipeDependence}
                        source={{ uri: ing.image }}
                      />
                    }
                    rightLabel={formatIngredientQuantityLabel(
                      ing.quantity?.type ?? RecipeQuantityTypeEnum.Personns,
                      roundNumber(
                        ((ing.quantity?.value ?? 1) * quantityCpt) /
                          (recipe.quantity?.value ?? 1),
                        1
                      ),
                      true
                    ).toString()}
                  />
                </TouchableOpacity>
              ))}
              {recipe.ingredients.map((ing) => (
                <ListItem
                  key={ing.id}
                  label={formatIngredientName(
                    ing.name,
                    ing.plural,
                    ing.quantity.type,
                    roundNumber(
                      (ing.quantity.value * quantityCpt) /
                        (recipe.quantity?.value ?? 1),
                      1
                    )
                  )}
                  leftIcon={
                    <Image style={styles.image} source={{ uri: ing.image }} />
                  }
                  rightLabel={formatIngredientQuantityLabel(
                    ing.quantity.type,
                    roundNumber(
                      (ing.quantity.value * quantityCpt) /
                        (recipe.quantity?.value ?? 1),
                      1
                    )
                  )}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.noDataLabel}>Aucun ingrédient</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Préparation</Text>
          {recipe.content.length > 0 ? (
            <View style={styles.sectionContent}>
              {recipe.content.map((step, i) => (
                <View key={i} style={styles.stepContainer}>
                  <Text style={styles.stepTitle}>Étape {i + 1} :</Text>
                  <Text style={styles.stepContent}>{step}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataLabel}>Aucune étape</Text>
          )}
        </View>
        <Commentary recipeId={recipe.id} commentary={recipe.commentary} />
        <Text style={styles.readyLabel}>Bon appétit !</Text>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          containerStyle={styles.modalStyle as any}
          closeButton={true}
          closeOnOverlay={false}
          title={dependencedRecipe?.name}
        >
          <Recipe
            route={{
              params: {
                ...route?.params,
                id: dependencedRecipe?.id,
                name: dependencedRecipe?.name,
              },
            }}
            isModal={true}
          />
        </Modal>
      </Container>

      {!isModal && (
        <Button
          style={styles.editButton}
          onPress={handleEditRecipe}
          rightIcon={<PencilIcon color="white" />}
          leftIcon={<PencilIcon color="white" />}
        >
          Modifier la recette
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 20 },
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: theme[400],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 5,
  },
  imageProfil: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "contain",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  typeImage: {
    width: 25,
    height: 25,
    marginRight: 5,
    tintColor: theme[400],
  },
  typeName: { color: theme[400], fontWeight: "500", fontSize: 15 },
  imageRecipeDependence: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  tagContainer: {
    paddingBottom: 5,
    marginTop: 15,
    alignSelf: "center",
  },
  ingredientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  doseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginRight: 10,
    borderColor: theme[400],
    borderWidth: 2,
    borderRadius: 50,
    width: "50%",
    justifyContent: "space-between",
  },
  doseIcon: { padding: 6 },
  doseLabel: {
    marginHorizontal: 5,
    fontSize: 14,
    color: theme[400],
    fontWeight: "600",
  },
  section: { marginBottom: 15 },
  sectionLabel: {
    color: theme[400],
    fontWeight: "800",
    fontSize: 25,
    marginBottom: 10,
  },
  sectionContent: {},
  noDataLabel: {
    marginLeft: 20,
    color: "red",
    fontWeight: "600",
    fontSize: 15,
  },
  stepContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  stepTitle: { color: theme[400], fontWeight: "700", fontSize: 18 },
  stepContent: { margin: 10 },
  readyLabel: {
    fontSize: 30,
    fontWeight: "600",
    color: theme[400],
    textAlign: "center",
    marginVertical: 20,
  },
  modalStyle: {
    width: "90%",
    backgroundColor: background,
    height: "90%",
  },
  editButton: {
    margin: 15,
  },
});
