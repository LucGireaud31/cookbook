import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import { useSendIdea } from "../../services/idea";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import { DumpbTextInput } from "../shared/form/DumbTextInput";
import { Highlight } from "../shared/Highlight";

interface IdeaProps {}

export function Idea(props: IdeaProps) {
  const {} = props;

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { goBack } = useNavigation();

  const sendIdea = useSendIdea();

  async function onSubmit() {
    if (message == "") return;

    setIsLoading(true);

    await sendIdea(message);

    setIsLoading(false);
    goBack();
  }

  return (
    <View style={styles.container}>
      <Container>
        <Text style={styles.h1}>Vous souhaitez :</Text>
        <View style={styles.questions}>
          <Text style={styles.h2}>
            - Rajouter une <Highlight>fonctionnalité</Highlight> ?
          </Text>
          <Text style={styles.h2}>
            - Reporter un <Highlight>bug</Highlight> ?
          </Text>
          <Text style={styles.h2}>
            - Faire part de votre <Highlight>expérience</Highlight> ?
          </Text>
        </View>
        <Text style={[styles.h2, { marginTop: 30 }]}>
          Tout retour est le bienvenu 😉.
        </Text>
        <DumpbTextInput
          numberOfLines={10}
          style={styles.input}
          onChangeText={(value) => {
            setMessage(value);
          }}
        />

        <Button
          style={{ marginTop: 20 }}
          onPress={onSubmit}
          isSubmiting={isLoading}
        >
          📨 Envoyer le message 📨
        </Button>
      </Container>
    </View>
  );
}

const base: any = {};

const styles = StyleSheet.create({
  container: {},
  h1: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "700",
  },
  questions: {
    marginTop: 20,
  },
  h2: {
    fontSize: 18,
    fontWeight: "400",
  },
  input: {
    textAlign: "left",
    textAlignVertical: "top",
    paddingVertical: 10,
    marginTop: 20,
  },
});
