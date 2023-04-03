import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TTag } from "../../types/tags";
import { Form } from "../shared/Form";
import { ColorPicker } from "../shared/form/ColorPicker";
import { Input } from "../shared/form/Input";
import { Modal } from "../shared/Modal";

export interface EditTagModalRef {
  onOpen(tag?: TTag): void;
}

interface EditTagModalProps {
  onAdd(name: string, color: string): void;
  onEdit(tag: TTag): void;
}

const DEFAULT_TAG = {
  id: "",
  name: undefined,
  color: undefined,
};

export const EditTagModal = forwardRef<EditTagModalRef, EditTagModalProps>(
  (props, ref) => {
    const { onAdd, onEdit } = props;

    const [isOpen, setIsOpen] = useState(false);

    const [modifiedTag, setModifiedTag] = useState<TTag>();

    const form = useForm<TTag>();

    useImperativeHandle(ref, () => ({
      onOpen: (tag) => {
        setIsOpen(true);
        setModifiedTag(tag);

        if (tag) {
          form.reset(tag);
        } else {
          form.reset(DEFAULT_TAG);
        }
      },
    }));

    function onSubmit(values: TTag) {
      setIsOpen(false);
      if (values.id) {
        onEdit(values);
      } else {
        onAdd(values.name, values.color);
      }
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={modifiedTag ? `Modifier ${modifiedTag.name}` : "Ajouter un tag"}
        onSubmit={form.handleSubmit(onSubmit)}
        onButton2Press={() => setIsOpen(false)}
      >
        <Form form={form}>
          <Input label="Nom" isRequired {...form.register("name")} />
          <ColorPicker label="Couleur" isRequired {...form.register("color")} />
        </Form>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
});
