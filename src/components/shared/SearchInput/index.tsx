import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useDebounce } from "../../../hooks/useDebounce";
import { gray, theme } from "../../../theme/colors";
import { FilterIcon, GlassIcon } from "../../icons/icons";
import { InputFormProps } from "../Form";
import { IconButton } from "../IconButton";

interface SearchInputProps extends InputFormProps {
  onFilter?(): void;
  onSubmit(): void;
  placeholder?: string;
}

export function SearchInput(props: SearchInputProps) {
  const { onFilter, onSubmit, name = "", placeholder } = props;

  const { field } = useController({ name });

  const [search, setSearch] = useState<string>();

  const searchDebounce = useDebounce(search, 300);

  useEffect(() => {
    if (searchDebounce != undefined) {
      field.onChange(searchDebounce);
      onSubmit();
    }
  }, [searchDebounce]);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.searchContainer,
          ...(!onFilter && { borderRadius: 50, width: "100%" }),
        }}
      >
        <TextInput
          style={styles.inputText}
          placeholder={placeholder ?? "Rechercher une recette..."}
          placeholderTextColor={gray[300]}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
          onSubmitEditing={onSubmit}
        />
        <IconButton icon={<GlassIcon />} onPress={onSubmit} />
      </View>
      {onFilter && (
        <TouchableOpacity style={styles.filterContainer} onPress={onFilter}>
          <FilterIcon />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    height: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderBottomStartRadius: 50,
    paddingRight: 10,
  },

  inputText: {
    marginLeft: 25,
    height: "100%",
    width: "80%",
    color: theme[400],
    fontWeight: "600",
  },
  filterContainer: {
    backgroundColor: theme[400],
    height: "100%",
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
  },
});
