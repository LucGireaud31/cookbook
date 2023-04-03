import get from "lodash.get";
import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

interface FormProps<T extends FieldValues = any> {
  children: ReactNode;
  form: UseFormReturn<T>;
}

export interface InputFormProps {
  name?: string;
  isRequired?: boolean;
  label?: string;
  subLabel?: string | number;
}

export function Form(props: FormProps) {
  const { form, children } = props;

  return <FormProvider {...form}>{children}</FormProvider>;
}

export function useFieldError(name?: string) {
  const form = useFormContext();

  return name ? get(form?.formState?.errors ?? {}, name) ?? null : null;
}
