import { useEffect, useMemo } from "react";
import { useController } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { gray, theme } from "../../../theme/colors";
import { CaretIcon } from "../../icons/icons";
import { useFieldError } from "../Form";
import { FieldContainer } from "../Form/FieldContainer";

export type TSelectOption = {
  key: string;
  label: string;
};

interface SelectProps {
  name: string;
  isRequired?: boolean;
  label?: string;
  data?: TSelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
}

export function Select(props: SelectProps) {
  const {
    label,
    isRequired,
    name,
    data = [],
    placeholder = "Sélectionner un élément",
    isDisabled = false,
  } = props;

  const error = useFieldError(name);

  const { field } = useController({
    rules: {
      required: isRequired,
    },
    name,
  });
  const isError = error != null;

  // Default value
  useEffect(() => {
    if (field.value) {
      field.onChange(field.value);
    }
  }, []);

  const selectedField = useMemo(
    () => data.find((d) => d.key == field.value),
    [field.value]
  );

  return (
    <FieldContainer label={label} error={error} isRequired={isRequired}>
      <ModalSelector
        disabled={isDisabled}
        style={{
          backgroundColor: "white",
          height: 40,
          borderColor: isDisabled ? gray[300] : theme[400],
          borderWidth: 1,
          borderRadius: 5,
          ...(isError && {
            borderWidth: 2,
            borderColor: "red",
          }),
        }}
        selectStyle={{
          alignItems: "flex-start",
        }}
        selectedItemTextStyle={{
          color: theme[700],
          fontWeight: "600",
        }}
        optionTextStyle={{
          color: "black",
        }}
        cancelStyle={{
          display: "none",
        }}
        optionContainerStyle={{
          width: "70%",
          alignSelf: "center",
        }}
        backdropPressToClose={true}
        animationType="fade"
        onChange={(newValue) => field.onChange(newValue.key)}
        data={data}
      >
        {selectedField ? (
          <Text style={[styles.label, isDisabled && { color: gray[300] }]}>
            {selectedField.label}
          </Text>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        <View
          style={{
            height: "100%",
            position: "absolute",
            right: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CaretIcon
            size={28}
            orientation="bottom"
            color={isError ? "red" : isDisabled ? gray[300] : undefined}
          />
        </View>
      </ModalSelector>
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    height: "100%",
    textAlignVertical: "center",
    marginLeft: 8,
  },
  placeholder: {
    color: gray[400],
    fontSize: 14,
    height: "100%",
    textAlignVertical: "center",
    marginLeft: 8,
  },
});
