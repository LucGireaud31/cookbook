import { View, StyleSheet } from "react-native";
import { DotMenuIcon } from "../../icons/icons";
import { Menu, Divider } from "react-native-paper";
import { useRef, useState } from "react";
import { DeletionModalRef, DeletionModal } from "../../shared/Modals/Deletion";
import { useDeleteRecipe } from "../../../services/recipes";
import { useNavigation } from "../../../hooks/useNavigation";
import { IconButton } from "../../shared/IconButton";
import { ShareRecipeModal, ShareRecipeModalRef } from "./ShareRecipeModal";
import { TRecipe } from "../../../types/recipe";
import {
  DisplayRecipePdfLoaderModal,
  DisplayRecipePdfLoaderModalRef,
} from "./DisplayRecipePdfLoaderModal";

interface RecipeActionProps {
  recipe: TRecipe;
}

export function RecipeAction(props: RecipeActionProps) {
  const { recipe } = props;

  const deletionModalRef = useRef<DeletionModalRef>(null);
  const shareRecipeRef = useRef<ShareRecipeModalRef>(null);
  const pdfLoaderRef = useRef<DisplayRecipePdfLoaderModalRef>(null);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const deleteRecipeMutation = useDeleteRecipe();

  const navigation = useNavigation();

  function handleDeleteRecipe() {
    deleteRecipeMutation(recipe.id);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            onPress={openMenu}
            icon={<DotMenuIcon />}
            style={styles.iconButton}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            shareRecipeRef.current?.onOpen(recipe.id, recipe.name);
          }}
          title="Partager la recette"
          leadingIcon={"share"}
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            pdfLoaderRef.current?.onOpen(recipe.id, recipe.name);
          }}
          title="Afficher en pdf"
          leadingIcon={"file"}
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            closeMenu();
            deletionModalRef.current?.onOpen(`la recette ${recipe.name}`);
          }}
          titleStyle={styles.deleteLabel}
          title="Supprimer"
        />
      </Menu>
      <DeletionModal ref={deletionModalRef} onDelete={handleDeleteRecipe} />
      <ShareRecipeModal ref={shareRecipeRef} />
      <DisplayRecipePdfLoaderModal ref={pdfLoaderRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  menuContent: {
    backgroundColor: "white",
  },
  iconButton: {
    padding: 10,
  },
  deleteLabel: {
    color: "red",
    fontWeight: "700",
  },
});
