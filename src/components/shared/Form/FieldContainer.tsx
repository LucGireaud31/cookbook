import { ReactNode, useRef, useState } from "react";
import {
  FieldError,
  Merge,
  FieldErrorsImpl,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import { gray } from "../../../theme/colors";
import { formatInputErrorMessage } from "../../../utils/errorMessage";
import { InfoIcon } from "../../icons/icons";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";

interface FieldContainerProps {
  children: ReactNode;
  label?: string;
  isRequired?: boolean;
  subLabel?: string | number;
  style?: StyleProp<ViewStyle>;
  subTitle?: string;
  errorMessage?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
  rules?: Merge<
    Omit<
      RegisterOptions<FieldValues, string>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled" | "required"
    >,
    { customMessage?: string }
  >;
  info?: string;
}

export function FieldContainer(props: FieldContainerProps) {
  const {
    children,
    error,
    label,
    isRequired,
    subLabel,
    style,
    subTitle,
    errorMessage,
    rules,
    info,
  } = props;

  const err = errorMessage ?? formatInputErrorMessage(error, rules);

  return (
    <View style={{ ...styles.container, ...(style as any) }}>
      {label && (
        <View style={styles.labelContainer}>
          {info && <InfoBulle info={info} />}
          <Text style={styles.label}>{label}</Text>
          {isRequired && <Text style={styles.required}>*</Text>}
          {subLabel && <Text style={styles.subLabel}>({subLabel})</Text>}
        </View>
      )}
      {children}
      {subTitle && <Text style={styles.subtitle}>{subTitle}</Text>}
      {error && <Text style={styles.error}>{err}</Text>}
    </View>
  );
}

function InfoBulle({ info }: { info: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        onPress={() => setIsOpen(true)}
        style={styles.info}
        icon={<InfoIcon />}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Text style={{ textAlign: "center" }}>{info}</Text>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 5 },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  required: {
    color: "red",
    marginLeft: 5,
  },
  info: {
    padding: 4,
    marginLeft: -4,
  },
  label: {
    fontSize: 15,
    color: gray[400],
    fontWeight: "600",
  },
  subLabel: {
    color: gray[300],
    fontSize: 15,
    marginLeft: 4,
  },
  error: {
    color: "red",
    marginTop: 3,
  },
  subtitle: {
    fontSize: 11,
    color: gray[400],
  },
});
