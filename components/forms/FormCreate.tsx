import { Button, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { root } from "../../helpers/root"
import { messageAtom, refreshDataAtom } from "../../store"
import { _Meta } from "../../types/interfaces/_Meta"

interface _Props {
  meta: _Meta
  closeModal: () => void
}

export const FormCreate: React.FC<_Props> = ({ meta, closeModal }: _Props) => {
  const [, messageSet] = useAtom(messageAtom)
  const [refreshData, refreshDataSet] = useAtom(refreshDataAtom)
  const fields = meta.table.formFields
  const resourceApi = meta.page

  const form = useForm({
    initialValues: root.formSetInitialValues({ fields }),
  })

  interface _FormValues {
    [key: string]: string
  }

  const onSubmitHandler = async (formValues: _FormValues) => {
    const body = { ...formValues }
    const res = await root.httpPost(`/api/${resourceApi}/create`, body)
    messageSet(res)
    refreshDataSet(!refreshData)
    closeModal()
  }

  return (
    <form onSubmit={form.onSubmit(onSubmitHandler)}>
      {fields.map((field, index) => {
        if (field.selection)
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
