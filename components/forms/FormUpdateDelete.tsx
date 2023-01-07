import { Button, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { DatePicker } from "./DatePicker"
import { Autocomplete } from "./Autocomplete"

import { useAutocomplete } from "../../hooks/useAutocomplete"

import { root } from "../../helpers/root"
import { messageAtom, refreshDataAtom, selectedRowAtom } from "../../store"
import { _Meta } from "../../types/interfaces/_Meta"
import { _Hide } from "../../types/enum/_Hide"
import { _FormField } from "../../types/interfaces/_FormField"
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

  /**
   * useAutocomplete hook is initialized here so that every Autocomplete
   * component form inputs share the same hook state data. We need the state
   * to be shared because some Autocomplete inputs depend on others
   * (ex. project/customer on activity resource)
   * if it were initialized directrly inside Autocomplete component,
   * each Autocomplete component would have different state
   */
  const autocompleteInitialValues = _setAutocompleteInitialValues(
    fields,
    selectedRow
  )
  const [autocompleteState, autocompleteDispatch] = useAutocomplete(
    autocompleteInitialValues
  )

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
        /** hide fields that should not be showed in FormUpdateDelete */
        if (field.hide.includes(_Hide.UPDATE)) return
        /** render date type fields using DatePicker component */
        if (field.type === _FieldType.DATE)
          return (
            <DatePicker
              key={index}
              field={field}
              form={form}
              selectedRow={selectedRow}
            ></DatePicker>
          )
        if (field.type === _FieldType.AUTOCOMPLETE)
          return (
            <Autocomplete
              key={index}
              field={field}
              selectedRow={selectedRow}
              autocompleteState={autocompleteState}
              autocompleteDispatch={autocompleteDispatch}
            ></Autocomplete>
          )
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

/**
 * in FormUpdateDelete when we initialize useAutocomplete custom hook, we
 * pass the default initial values that autocomplete fields use when rendered
 */
interface _ReturnValue {
  customer: { value: string }
  project: { value: string }
  user: { value: string }
}

function _setAutocompleteInitialValues(
  fields: _FormField[],
  selectedRow: { [key: string]: string }
): _ReturnValue {
  const defaultSelection = fields.reduce<_ReturnValue>((obj, currentValue) => {
    /** https://bobbyhadz.com/blog/typescript-reduce-type */
    if (currentValue.type === _FieldType.AUTOCOMPLETE) {
      const resourceName = currentValue.autocompleteData!.resourceName
      const fieldName = currentValue.key
      obj[resourceName] = { value: selectedRow[fieldName] }
    }
    return obj
  }, {} as _ReturnValue)

  return defaultSelection
}
