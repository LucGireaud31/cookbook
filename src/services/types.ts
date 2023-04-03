import { gql, useQuery } from "@apollo/client";
import { TType } from "../types/type";

const queryGetTypes = gql`
  query types {
    types {
      id
      name
      image
    }
  }
`;

export function useTypes() {
  const result = useQuery<{ types: TType[] }>(queryGetTypes);
  return { ...result, data: result.data?.types, query: queryGetTypes };
}
