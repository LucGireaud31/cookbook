import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
} from "react-hook-form";
import { toPlural } from "./string";

type TInputErrorType = "minLength";

export function formatInputErrorMessage(
  error:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | null
    | undefined,
  rules?: Merge<
    Omit<
      RegisterOptions<FieldValues, string>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled" | "required"
    >,
    { customMessage?: string }
  >
) {
  if (!error) return "Ce champ est requis";

  switch (error.type) {
    case "minLength":
      return `Minimum ${rules?.minLength ?? 0} ${toPlural(
        "caractère",
        parseInt(rules?.minLength?.toString() ?? "0")
      )}`;
    case "maxLength":
      return `Maximum ${rules?.minLength ?? 0} ${toPlural(
        "caractère",
        parseInt(rules?.minLength?.toString() ?? "0")
      )}`;
    default:
      return rules?.customMessage ?? "Ce champ est requis";
  }
}
