import { SelectValue } from "@/components/ui/select";

type FormSelectOption = {
  label: string;
  value?: string;
  id?: string;
};

type FormSelectValueProps = {
  value?: string;
  options: ReadonlyArray<FormSelectOption>;
  placeholder: string;
};

function getOptionKey(option: FormSelectOption): string {
  return option.value ?? option.id ?? "";
}

export function FormSelectValue({ value, options, placeholder }: FormSelectValueProps) {
  const label = value
    ? options.find((option) => getOptionKey(option) === value)?.label
    : undefined;

  return <SelectValue placeholder={placeholder}>{label}</SelectValue>;
}
