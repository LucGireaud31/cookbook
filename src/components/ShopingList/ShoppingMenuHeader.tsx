import { useState } from "react";
import { StyleSheet } from "react-native";
import { Menu } from "react-native-paper";
import { useNavigation } from "../../hooks/useNavigation";
import { DotMenuIcon } from "../icons/icons";
import { IconButton } from "../shared/IconButton";

interface ShoppingMenuHeaderProps {}

export function ShoppingMenuHeader(props: ShoppingMenuHeaderProps) {
  const {} = props;

  const [visible, setVisible] = useState(false);

  const { navigate } = useNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      onDismiss={closeMenu}
      visible={visible}
      anchor={
        <IconButton
          onPress={openMenu}
          icon={<DotMenuIcon />}
          style={styles.iconButton}
        />
      }
    >
      <Menu.Item
        title="Depuis mes recettes"
        leadingIcon="plus"
        onPress={() => {
          closeMenu();
          navigate("addFromRecipe");
        }}
      />
    </Menu>
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
