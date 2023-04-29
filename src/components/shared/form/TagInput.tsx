import { useMemo } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { TTag } from "../../../types/tags";
import { toPlural } from "../../../utils/string";
import { useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";
import { TextToSelect } from "../TextToSelect";

interface TagInputProps {
  name: string;
  isRequired?: boolean;
  label?: string;
  subLabel?: string;
  tags?: TTag[];
}

export function TagInput(props: TagInputProps) {
  const { label, isRequired, name, tags = [] } = props;

  const error = useFieldError(name);

  const { field } = useController({
    rules: {
      required: isRequired,
    },
    name,
  });

  const selectedTags: string[] = useMemo(
    () => field.value ?? [],
    [field.value]
  );

  function onTagPress(tag: TTag, newSelected: boolean) {
    let newTags = [...selectedTags];

    if (newSelected) {
      newTags.push(tag.id);
    } else {
      newTags = newTags.filter((t) => t != tag.id);
    }
    field.onChange(newTags);
  }

  return (
    <FieldContainer
      label={label}
      error={error}
      subLabel={`${selectedTags.length} ${toPlural(
        "sélectionné",
        selectedTags.length
      )}`}
      isRequired={isRequired}
    >
      <View style={styles.inputContainer}>
        {tags.map((tag) => (
          <TextToSelect
            key={tag.id}
            isSelected={selectedTags.find((t) => t == tag.id) != undefined}
            label={tag.name}
            onPress={(newSelected) => onTagPress(tag, newSelected)}
          />
        ))}
      </View>
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});
