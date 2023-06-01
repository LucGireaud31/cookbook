import { gql, useMutation } from "@apollo/client";

const mutatonAddConnexionEvent = gql`
  mutation connexionEvent {
    connexionEvent
  }
`;

export function mutationAddConnexionEvent() {
  const [mutation] = useMutation(mutatonAddConnexionEvent);

  function mutate() {
    mutation();
  }
  return mutate;
}
