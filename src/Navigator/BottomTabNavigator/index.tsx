import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EditForm } from "../../components/Recipe/EdtForm";
import { HomeNavigator } from "../HomeNavigator";
import { ShoppingListNavigator } from "../ShoppingListNavigator";
import { TabBar } from "./TabBar";

export function BottomTabContainer() {
  const StackBottomTab = createBottomTabNavigator();

  return (
    <StackBottomTab.Navigator
      screenOptions={{
        header: () => null,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <StackBottomTab.Screen name="home" component={HomeNavigator} />
      <StackBottomTab.Screen name="createRecipe" component={EditForm} />
      <StackBottomTab.Screen name="shop" component={ShoppingListNavigator} />
    </StackBottomTab.Navigator>
  );
}
