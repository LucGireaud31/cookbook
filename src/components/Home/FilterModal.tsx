import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { FilterProps } from "../../services/recipes";
import { useTags } from "../../services/tags";
import { Form } from "../shared/Form";
import { MultiIngredientInput } from "../shared/form/MultiIngredientInput";
import { NoteInput } from "../shared/form/NoteInput";
import { TagInput } from "../shared/form/TagInput";
import { Modal } from "../shared/Modal";

export interface FilterModalRef {
  onOpen(): void;
}

interface FilterModalProps {
  onSubmit(value: FilterProps): void;
  isOpen: boolean;
  onClose(): void;
}

export const FilterModal = forwardRef<FilterModalRef, FilterModalProps>(
  (props, ref) => {
    const { onSubmit, isOpen, onClose } = props;

    const { data: tags } = useTags();

    const form = useFormContext<FilterProps>();

    const nbSelectedIngredients = form.watch("ingredients")?.length ?? 0;

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        animationType="slide"
        containerStyle={styles.container}
        title="Filtrer les recettes"
        titleStyle={styles.modalTitle}
        closeButton={true}
        submitButtonLabel="Appliquer"
        onSubmit={() => {
          onSubmit(form.getValues());
          onClose();
        }}
      >
        <Form form={form}>
          <NoteInput
            label="Note minimale"
            {...form.register("minNote")}
            subLabel={form.watch("minNote")}
          />
          <TagInput label="Tags" tags={tags} {...form.register("tags")} />
          {/* <YesNoInput
            label="Favoris seulement"
            subLabel={form.watch("isFavorite") ? "oui" : "non"}
            {...form.register("isFavorite")}
          /> */}
          <MultiIngredientInput
            label="Ingredients"
            subLabel={`${nbSelectedIngredients} ${
              nbSelectedIngredients < 2
                ? "ingrédient sélectionné"
                : "ingrédients sélectionnés"
            }`}
            {...form.register("ingredients")}
          />
        </Form>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalTitle: {
    marginTop: 4,
  },
});
