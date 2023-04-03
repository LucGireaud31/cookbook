import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { Navigator } from "./src/Navigator";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ENV } from "./env";
import { Provider } from "jotai";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const apolloClient = new ApolloClient({
  uri: ENV.API.URL,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Provider>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </Provider>
      </ApolloProvider>
      <Toast />
    </>
  );
}
