import { Button, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { DatePicker } from "./DatePicker"

import { root } from "../../helpers/root"
import { messageAtom, refreshDataAtom } from "../../store"
import { _Meta } from "../../types/interfaces/_Meta"
import { _FieldType } from "../../types/enum/_FieldType"
import { _Hide } from "../../types/enum/_Hide"

interface _Props {
  meta: _Meta
  closeModal: () => void
}

export const FormCreate: React.FC<_Props> = ({ meta, closeModal }: _Props) => {
  const [, messageSet] = useAtom(messageAtom)
  const [refreshData, refreshDataSet] = useAtom(refreshDataAtom)
  const fields = meta.table.formFields
  const resourceApi = meta.page

  /** create mantine form and set initial values */
  const form = useForm({
    initialValues: root.formSetInitialValues({ fields }),
  })

  interface _FormValues {
    [key: string]: string
  }

  const onSubmitHandler = async (formValues: _FormValues) => {
    const rawBody = { ...formValues }

    const body = root.formNormalizeFormValues(rawBody)

    const res = await root.httpPost(`/api/${resourceApi}/create`, body)
    messageSet(res)
    refreshDataSet(!refreshData)
    closeModal()
  }

  return (
    <form onSubmit={form.onSubmit(onSubmitHandler)}>
      {fields.map((field, index) => {
        if (field.hide.includes(_Hide.CREATE)) return
        if (field.type === _FieldType.DATE)
          return <DatePicker key={index} field={field} form={form}></DatePicker>
        if (field.type === _FieldType.SELECTION)
          return (
            <Select
              key={index}
              /** defaultValue not working anymore with current mantine version */
              defaultValue={"user"}
              label={field.header}
              data={field.selection}
              {...form.getInputProps(field.key)}
              mb={"sm"}
            ></Select>
          )
        return (
          <TextInput
            key={index}
            label={field.header}
            {...form.getInputProps(field.key)}
            mb={"sm"}
          ></TextInput>
        )
      })}
      <Button type="submit">Save</Button>
    </form>
  )
}
