import { capitalize } from "lodash";
import { useMemo } from "react";
import { useController } from "react-hook-form";
import { FlatList, StyleSheet, Text } from "react-native";
import { theme } from "../../../theme/colors";
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
      <FlatList
        nestedScrollEnabled={false}
        data={tags}
        numColumns={3}
        contentContainerStyle={styles.inputContainer}
        renderItem={(tag) => (
          <TextToSelect
            isSelected={selectedTags.find((t) => t == tag.item.id) != undefined}
            label={tag.item.name}
            onPress={(newSelected) => onTagPress(tag.item, newSelected)}
          />
        )}
      />
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {},
});
