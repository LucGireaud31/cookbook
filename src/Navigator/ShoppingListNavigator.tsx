import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { BackButton } from ".";
import { DrawerIcon } from "../components/icons/icons";
import { ShoppingList } from "../components/ShopingList";
import { background, theme } from "../theme/colors";

export function ShoppingListNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        animation: "slide_from_right",
        headerStyle: {
          backgroundColor: background,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: background,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={navigation.toggleDrawer}
          >
            <DrawerIcon size={30} />
          </TouchableOpacity>
        ),
        title: "Ma liste de courses",
        headerTitleAlign: "center",
        headerTintColor: theme[400],
      })}
    >
      <Stack.Screen name="shopList" component={ShoppingList} />
      <Stack.Screen
        name="addFromRecipe"
        component={ShoppingList}
        options={{ headerLeft: BackButton }}
      />
    </Stack.Navigator>
  );
}
