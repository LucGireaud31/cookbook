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
import { generatePdfUri } from "../../../utils/pdf";
import {
  createDownloadResumable,
  documentDirectory,
  getContentUriAsync,
} from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";
import { Toast } from "react-native-toast-message/lib/src/Toast";

interface RecipeActionProps {
  recipe: TRecipe;
}

export function RecipeAction(props: RecipeActionProps) {
  const { recipe } = props;

  const deletionModalRef = useRef<DeletionModalRef>(null);
  const shareRecipeRef = useRef<ShareRecipeModalRef>(null);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const deleteRecipeMutation = useDeleteRecipe();

  const navigation = useNavigation();

  function handleDeleteRecipe() {
    deleteRecipeMutation(recipe.id);
    navigation.goBack();
  }

  async function handleDownload() {
    closeMenu();
    Toast.show({
      text1: "Téléchargement en cours",
      text2: "Ca ne sera pas long, promis 😉",
      type: "info",
    });
    const downloadResumable = createDownloadResumable(
      generatePdfUri(recipe.id, recipe.name),
      documentDirectory + `${recipe.name}.pdf`
    );
    try {
      const result = await downloadResumable.downloadAsync();
      if (result) {
        const cUri = await getContentUriAsync(result.uri);

        await startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
          type: "application/pdf",
        });
      }
    } catch (e) {
      Toast.show({
        text1: "Une erreure est survenue",
        text2: "Veuillez réessayer dans quelques minutes 😟",
        type: "error",
      });
    }
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
          onPress={() => handleDownload()}
          title="Télécharger"
          leadingIcon={"download"}
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
