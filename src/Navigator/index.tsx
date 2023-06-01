import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { background } from "../theme/colors";
import { useNavigation } from "../hooks/useNavigation";
import { ArrowLeftIcon } from "../components/icons/icons";
import { IconButton } from "../components/shared/IconButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "../components/Layout/Drawer";
import {
  getTokenLocalStorage,
  setFilterLocalStorage,
} from "../services/asyncStorage";
import { Login } from "../components/Login";
import { atom, useAtom } from "jotai";
import { useSetApolloHeader } from "../hooks/useSetApolloHeader";
import { CreateAccount } from "../components/Login/CreateAccount";
import { ForgotPassword } from "../components/Login/ForgotPassword";
import * as Linking from "expo-linking";
import { ResetPassword } from "../components/Login/ResetPassword";
import { StatusBar } from "expo-status-bar";
import { ShareMyBook } from "../components/Login/CreateAccount/ShareMyBook";
import { BottomTabContainer } from "./BottomTabNavigator";
import { mutationAddConnexionEvent } from "../services/trace";

export const tokenAtom = atom<string | null>(null);

export function BackButton() {
  const { goBack } = useNavigation();

  return <IconButton onPress={goBack} icon={<ArrowLeftIcon />} />;
}

export function Navigator() {
  const StackDrawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const [token, setToken] = useAtom(tokenAtom);
  const [authentified, setAuthentified] = useState(false);
  const setApolloHeader = useSetApolloHeader();
  const addConnexionEvent = mutationAddConnexionEvent();

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
    setFilterLocalStorage({});
  }, []);

  useEffect(() => {
    if (token) {
      setApolloHeader(token);
      addConnexionEvent();
    }
    setAuthentified(token != null);
  }, [token]);

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
            <StackDrawer.Screen
              name="Container"
              component={BottomTabContainer}
            />
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
            <Stack.Screen name="shareMyBook" component={ShareMyBook} />
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
