import { useSetAtom } from "jotai";
import { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { getFilterLocalStorage } from "../../services/asyncStorage";
import {
  useAddTag,
  useDeleteTag,
  useTags,
  useUpdateTag,
} from "../../services/tags";
import { gray, theme } from "../../theme/colors";
import { TTag } from "../../types/tags";
import { normalize } from "../../utils/string";
import { filterAtom } from "../Home";
import { GlassIcon } from "../icons/icons";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import { ListItem } from "../shared/ListItem";
import { DeletionModal, DeletionModalRef } from "../shared/Modals/Deletion";
import { EditTagModal, EditTagModalRef } from "./EditTagModal";

interface TagsProps {}

export function Tags(props: TagsProps) {
  const {} = props;

  const [search, setSearch] = useState("");

  const setFilter = useSetAtom(filterAtom);

  const { data: tags, query } = useTags();
  const onDeleteTag = useDeleteTag();
  const addTag = useAddTag();
  const editTag = useUpdateTag();

  const deleteModalRef = useRef<DeletionModalRef>(null);
  const editModalRef = useRef<EditTagModalRef>(null);

  function onSearch() {}

  async function onEdit({ id, ...tag }: TTag) {
    editTag(id, tag);
  }
  async function onAdd(name: string, color: string) {
    addTag(name, color);
  }

  async function deleteTag(id: string) {
    await onDeleteTag(id);
    setFilter(await getFilterLocalStorage());
  }

  const filteredTags = useMemo(() => {
    if (search != "")
      return tags.filter((tag) =>
        normalize(tag.name).includes(normalize(search))
      );
    return tags;
  }, [tags, search]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Rechercher un tag..."
          placeholderTextColor={gray[300]}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={onSearch}>
          <GlassIcon />
        </TouchableOpacity>
      </View>
      <Container style={styles.tagContainer} queryToRefetch={query}>
        {filteredTags.length == 0 && (
          <Text style={styles.noData}>Aucun tag</Text>
        )}
        {filteredTags.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => editModalRef.current?.onOpen(tag)}
          >
            <ListItem
              style={styles.item}
              leftColor={tag.color}
              label={tag.name}
              onDelete={() => deleteModalRef.current?.onOpen(tag.name, tag.id)}
            />
          </TouchableOpacity>
        ))}
      </Container>
      <Button
        style={styles.buttonAdd}
        onPress={() => editModalRef.current?.onOpen()}
      >
        Créer un tag
      </Button>
      <DeletionModal ref={deleteModalRef} onDelete={deleteTag} />
      <EditTagModal ref={editModalRef} onEdit={onEdit} onAdd={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    height: 50,
  },
  searchInput: {
    width: "80%",
    height: "100%",
    marginLeft: 15,
    color: theme[400],
    fontWeight: "600",
  },
  searchIcon: {
    marginLeft: 5,
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tagContainer: {
    paddingHorizontal: 0,
    paddingTop: 20,
  },
  item: {
    height: 50,
  },
  buttonAdd: {
    marginVertical: 15,
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: theme[400],
    fontWeight: "600",
  },
});
