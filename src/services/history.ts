import { ApolloClient, gql, useQuery } from "@apollo/client";
import { THistory } from "../types/history";

const queryGetHistory = gql`
  query history($version: String) {
    history(version: $version) {
      id
      version
      description
      date
    }
  }
`;

export async function getHistory(client: ApolloClient<any>, version?: string) {
  return (
    await client.query<{ history: THistory }>({
      query: queryGetHistory,
      variables: { version },
    })
  ).data.history;
}
