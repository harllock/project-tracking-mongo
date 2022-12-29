import { Button, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { root } from "../../helpers/root"
import { messageAtom, refreshDataAtom, selectedRowAtom } from "../../store"
import { _Meta } from "../../types/interfaces/_Meta"
import { _Hide } from "../../types/enum/_Hide"
import { _FieldType } from "../../types/enum/_FieldType"

interface _Props {
  meta: _Meta
  closeModal: () => void
}

export const FormUpdateDelete: React.FC<_Props> = ({
  meta,
  closeModal,
}: _Props) => {
  const [, messageSet] = useAtom(messageAtom)
  const [refreshData, refreshDataSet] = useAtom(refreshDataAtom)
  const [selectedRow, selectedRowSet] = useAtom(selectedRowAtom)

  const fields = meta.table.formFields
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
    messageSet(res)
    selectedRowSet({})
    refreshDataSet(!refreshData)
    closeModal()
  }

  const onDeleteHandler = async () => {
    const _id = selectedRow._id
    const res = await root.httpPost(`/api/${resourceApi}/delete`, { _id })
    messageSet(res)
    selectedRowSet({})
    refreshDataSet(!refreshData)
    closeModal()
  }

  return (
    <form onSubmit={form.onSubmit(onSubmitHandler)}>
      {fields.map((field, index) => {
        if (field.hide.includes(_Hide.UPDATE)) return
        if (field.type === _FieldType.SELECTION)
          return (
            <Select
              key={index}
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
            mb="sm"
          ></TextInput>
        )
      })}
      <Button color="red" mr="md" onClick={onDeleteHandler} type="button">
        Delete
      </Button>
      <Button type="submit">Update</Button>
    </form>
  )
}
