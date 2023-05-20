import { useMemo, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useIngredients } from "../../../services/ingredients";
import { theme } from "../../../theme/colors";
import { normalize } from "../../../utils/string";
import { GlassIcon } from "../../icons/icons";
import { InputFormProps, useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { IngredientButton } from "./IngredientButton";
import { Input } from "./Input";

interface MultiIngredientInputProps extends InputFormProps {
  mappedIngredients?: string[];
  onSubmit?(unities: number[]): void;
}

export function MultiIngredientInput(props: MultiIngredientInputProps) {
  const {
    isRequired,
    mappedIngredients = [],
    onSubmit,
    name = "",
    ...rest
  } = props;

  const { data: ingredients } = useIngredients();

  const { setValue, getValues, watch } = useFormContext<{
    ingredients: string[];
  }>();

  const error = useFieldError("id");

  const [search, setSearch] = useState("");

  const defaultIds = useMemo(() => getValues("ingredients"), []);

  useController({
    name,
    rules: {
      required: isRequired,
    },
  });

  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  const selectedIds = watch("ingredients");

  const filteredIngredients =
    (search.length > 0
      ? ingredients?.filter(
          (ing) =>
            !selectedIds.includes(ing.id) &&
            (!mappedIngredients.includes(ing.id) ||
              defaultIds.includes(ing.id)) &&
            normalize(ing.name).includes(normalize(search))
        )
      : null) ?? [];

  function handleIngredientPress(id: string) {
    setValue("ingredients", [...getValues("ingredients"), id]);
  }

  function handleDeleteIngredient(id: string) {
    setValue(
      "ingredients",
      getValues("ingredients").filter((i) => i != id)
    );
  }

  const isError = error != null;

  return (
    <FieldContainer error={error} isRequired={isRequired} {...rest}>
      <View
        style={[
          styles.container,
          isError && { borderColor: "red", borderWidth: 2 },
        ]}
      >
        <Input
          inputRef={inputRef}
          style={styles.input}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
          placeholder="Nom de l'ingrédient"
        />
        <View style={styles.icon}>
          <GlassIcon />
        </View>
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="always"
          horizontal={true}
          style={[
            styles.ingredientsContainer,
            isError && { borderColor: "red", borderTopWidth: 2 },
          ]}
        >
          {getValues("ingredients")?.map((id) => {
            const ing = ingredients?.find((i) => i.id == id);
            if (!ing) return null;

            return (
              <IngredientButton
                key={ing.id}
                name={ing.name}
                image={ing.image}
                onPress={() => handleDeleteIngredient(ing.id)}
                isSelected={true}
              />
            );
          })}
          {filteredIngredients.map((ing) => (
            <IngredientButton
              key={ing.id}
              name={ing.name}
              image={ing.image}
              onPress={() => {
                handleIngredientPress(ing.id);
              }}
              isSelected={false}
            />
          ))}
        </ScrollView>
      </View>
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 163,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: theme[400],
  },
  input: { height: 30, borderWidth: 0 },
  icon: { position: "absolute", right: 5, top: 6 },
  ingredientsContainer: {
    borderTopWidth: 1,
    borderColor: theme[400],
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
  },
});
