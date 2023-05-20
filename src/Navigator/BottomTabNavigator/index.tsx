import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tags } from "../../components/Tags";
import { HomeNavigator } from "../HomeNavigator";
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
      <StackBottomTab.Screen name="Accueil" component={HomeNavigator} />
      <StackBottomTab.Screen name="Tags" component={Tags} />
    </StackBottomTab.Navigator>
  );
}
