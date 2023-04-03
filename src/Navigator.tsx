import { TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { background, theme } from "./theme/colors";
import { Home } from "./components/Home";
import { Recipe } from "./components/Recipe";
import { EditForm } from "./components/Recipe/EdtForm";
import { Ingredients } from "./components/Ingredients";
import { Tags } from "./components/Tags";
import { useNavigation } from "./hooks/useNavigation";
import { ArrowLeftIcon, DrawerIcon } from "./components/icons/icons";
import { IconButton } from "./components/shared/IconButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "./components/Layout/Drawer";
import { getTokenLocalStorage } from "./services/asyncStorage";
import { Login } from "./components/Login";
import { atom, useAtom } from "jotai";
import { useSetApolloHeader } from "./hooks/useSetApolloHeader";
import { CreateAccount } from "./components/Login/CreateAccount";
import { ForgotPassword } from "./components/Login/ForgotPassword";
import * as Linking from "expo-linking";
import { ResetPassword } from "./components/Login/ResetPassword";
import { StatusBar } from "expo-status-bar";

export const tokenAtom = atom<string | null>(null);

export function Navigator() {
  const StackDrawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const { goBack } = useNavigation();

  const [token, setToken] = useAtom(tokenAtom);
  const [authentified, setAuthentified] = useState(false);
  const setApolloHeader = useSetApolloHeader();

  const { navigate } = useNavigation();

  const url = Linking.useURL();

  if (url) {
    const { queryParams } = Linking.parse(url);
    const params = queryParams as { token: string };
    if (params.token) {
      navigate("resetPassword", { token: params.token.split("?")[0] });
    }
  }

  useEffect(() => {
    (async () => {
      const token = await getTokenLocalStorage();
      setToken(token);
    })();
  }, []);

  useEffect(() => {
    if (token) {
      setApolloHeader(token);
    }
    setAuthentified(token != null);
  }, [token]);

  function BackButton() {
    return <IconButton onPress={goBack} icon={<ArrowLeftIcon />} />;
  }

  function Container() {
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
      </Stack.Navigator>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={{ height: "100%", backgroundColor: background }}>
        {authentified ? (
          <StackDrawer.Navigator
            screenOptions={{
              header: () => null,
            }}
            drawerContent={() => <Drawer />}
          >
            <StackDrawer.Screen name="Container" component={Container} />
          </StackDrawer.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              animation: "slide_from_right",
              header: () => null,
            }}
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="createAccount" component={CreateAccount} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="resetPassword" component={ResetPassword} />
          </Stack.Navigator>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
