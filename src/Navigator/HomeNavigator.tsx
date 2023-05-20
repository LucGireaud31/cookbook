import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { BackButton } from ".";
import { Home } from "../components/Home";
import { DrawerIcon } from "../components/icons/icons";
import { Idea } from "../components/Idea";
import { Ingredients } from "../components/Ingredients";
import { Recipe } from "../components/Recipe";
import { EditForm } from "../components/Recipe/EdtForm";
import { ScanRecipeFromUser } from "../components/ScanRecipeFromUser";
import { Tags } from "../components/Tags";
import { background, theme } from "../theme/colors";

interface HomeNavigatorProps {}

export function HomeNavigator(props: HomeNavigatorProps) {
  const {} = props;

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

        headerTitleAlign: "center",
        headerTintColor: theme[400],
      })}
    >
      <Stack.Screen name="Livre de recettes" component={Home} />
      <Stack.Screen
        name="recipePage"
        component={Recipe}
        options={{ headerLeft: BackButton }}
      />
      <Stack.Screen
        name="recipeEdit"
        component={EditForm}
        options={{ headerLeft: BackButton }}
      />
      <Stack.Screen
        name="ingredients"
        component={Ingredients}
        options={{ headerLeft: BackButton }}
      />
      <Stack.Screen
        name="tags"
        component={Tags}
        options={{ headerLeft: BackButton, title: "Tags" }}
      />
      <Stack.Screen
        name="idea"
        component={Idea}
        options={{ headerLeft: BackButton, title: "Proposer une idée" }}
      />
      <Stack.Screen
        name="scanRecipeFromUser"
        component={ScanRecipeFromUser}
        options={{ headerLeft: BackButton, title: "Scanner une recette" }}
      />
    </Stack.Navigator>
  );
}
