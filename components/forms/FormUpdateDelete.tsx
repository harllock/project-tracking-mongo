import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { root } from "../../helpers/root"
import { dataAtom, refreshDataAtom, selectedRowAtom } from "../../store"
import { _Meta } from "../interfaces/_Meta"

interface _Props {
  meta: _Meta
  closeModal: () => void
}

export const FormUpdateDelete: React.FC<_Props> = ({
  meta,
  closeModal,
}: _Props) => {
  const [, dataSet] = useAtom(dataAtom)
  const [refreshData, refreshDataSet] = useAtom(refreshDataAtom)
  const [selectedRow, selectedRowSet] = useAtom(selectedRowAtom)

  const fields = meta.table.formFields
  const resource = meta.resourceName
  const resourceApi = meta.page

  const form = useForm({
    initialValues: root.formSetInitialValues({ fields, selectedRow }),
  })

  interface _FormValues {
    [key: string]: string
  }

  const onSubmitHandler = async (formValues: _FormValues) => {
    const body = { ...formValues }
    const res = await root.httpPost(`/api/${resourceApi}/update`, body)
    refreshDataSet(!refreshData)
    closeModal()
  }

  return (
    <form onSubmit={form.onSubmit(onSubmitHandler)}>
      {fields.map((field, index) => {
        return (
          <TextInput
            key={index}
            label={field.header}
            {...form.getInputProps(field.key)}
            mb="sm"
          ></TextInput>
        )
      })}
      <Button type="submit">Update</Button>
    </form>
  )
}
