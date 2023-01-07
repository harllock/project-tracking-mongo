import { DatePicker as MantineDatePicker } from "@mantine/dates"
import { useState } from "react"

import { _FormField } from "../../types/interfaces/_FormField"
import dayjs from "dayjs"

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
  /**
   * if selectedRow is present we are in FormUpdateDelete component and
   * then we use field.key as field value; otherwise we are in FormCreate
   * and set the field value to empty string
   */
  const dateDefaultValue = selectedRow
    ? dayjs(selectedRow[field.key]).toDate()
    : ""

  /** Mantine Date Picker use react state to handle its value */
  const [date] = useState(dateDefaultValue)

  return (
    <MantineDatePicker
      label={field.header}
      {...form.getInputProps(field.key)}
      value={date}
      mb={"sm"}
    ></MantineDatePicker>
  )
}
