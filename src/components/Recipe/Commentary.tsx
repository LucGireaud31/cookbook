import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSetCommentary } from "../../services/recipes";
import { theme } from "../../theme/colors";
import { sleep } from "../../utils/promise";
import { CheckIcon, LightIcon, PencilIcon, PlusIcon } from "../icons/icons";
import { DumpbTextInput } from "../shared/form/DumbTextInput";
import { IconButton } from "../shared/IconButton";

interface CommentaryProps {
  recipeId: string;
  commentary?: string;
}

export function Commentary(props: CommentaryProps) {
  const { recipeId, commentary } = props;

  const commentaryMutation = useSetCommentary();

  const [isEditing, setIsEditing] = useState(commentary != undefined);
  const [value, setValue] = useState("");

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setValue(commentary ?? "");
    setIsEditing(false);
  }, [commentary]);

  function handleSave() {
    commentaryMutation(recipeId, value);
  }

  async function onEdit() {
    setIsEditing(true);

    await sleep(100);
    inputRef?.current?.focus();
  }

  if (commentary || isEditing)
    return (
      <View style={styles.commentaryContainer}>
        <View style={styles.commentaryLabelContainer}>
          <View style={styles.leftContainer}>
            <LightIcon color={theme[300]} />
            <Text style={styles.commentaryLabel}>Conseil</Text>
          </View>
          {isEditing ? (
            <IconButton
              icon={<CheckIcon color={theme[300]} />}
              onPress={handleSave}
            />
          ) : (
            <IconButton
              icon={<PencilIcon color={theme[300]} weight="bold" />}
              onPress={onEdit}
            />
          )}
        </View>
        {isEditing ? (
          <DumpbTextInput
            inputRef={inputRef}
            numberOfLines={4}
            value={value}
            style={styles.input}
            onChangeText={(text) => setValue(text)}
          />
        ) : (
          <Text style={styles.commentaryContent}>{commentary}</Text>
        )}
      </View>
    );

  return (
    <TouchableOpacity
      style={styles.addCommentary}
      onPress={() => setIsEditing(true)}
    >
      <PlusIcon size={20} />
      <Text style={styles.addCommentaryLabel}>Ajouter un conseil</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  commentaryContainer: {
    backgroundColor: theme[50] + "4D",
    borderRadius: 20,
    padding: 10,
  },
  commentaryLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentaryContent: { color: theme[300], marginLeft: 28, marginTop: 5 },
  commentaryLabel: {
    marginLeft: 5,
    fontSize: 16,
    color: theme[300],
    fontWeight: "600",
  },
  leftContainer: { flexDirection: "row", alignItems: "center" },
  addCommentary: {
    flexDirection: "row",
    alignItems: "center",
  },
  addCommentaryLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: theme[400],
    marginLeft: 5,
  },
  input: {
    marginLeft: 18,
    marginTop: 5,
  },
});
