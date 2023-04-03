import { createHttpLink, useApolloClient } from "@apollo/client";
import { ENV } from "../../env";

export function useSetApolloHeader() {
  const client = useApolloClient();

  function setHeader(token: string) {
    const link = createHttpLink({
      uri: ENV.API.URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    client.setLink(link);
  }

  return setHeader;
}
