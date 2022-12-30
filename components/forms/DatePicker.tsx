import { DatePicker as MantineDatePicker } from "@mantine/dates"
import { _FormField } from "../../types/interfaces/_FormField"

interface _Props {
  selectedRow?: { [key: string]: string }
  field: _FormField
  form: any
}

export const DatePicker: React.FC<_Props> = ({
  selectedRow,
  field,
  form,
}: _Props) => {
  const dateDefaultValue = selectedRow ? new Date(selectedRow[field.key]) : ""

  return (
    <MantineDatePicker
      label={field.header}
      {...form.getInputProps(field.key)}
      value={dateDefaultValue}
      mb={"sm"}
    ></MantineDatePicker>
  )
}
