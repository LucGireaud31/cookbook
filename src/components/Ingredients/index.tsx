import { View, StyleSheet, Text } from "react-native";
import { Container } from "../Layout/Container";

interface IngredientsProps {}

export function Ingredients(props: IngredientsProps) {
  const {} = props;

  return (
    <Container style={styles.container}>
      <Text>Ingredients</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
});
