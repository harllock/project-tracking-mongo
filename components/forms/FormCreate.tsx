import { Button, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { DatePicker } from "./DatePicker"
import { Autocomplete } from "./Autocomplete"

import { root } from "../../helpers/root"
import { messageAtom, refreshDataAtom } from "../../store"
import { _Meta } from "../../types/interfaces/_Meta"
import { _FieldType } from "../../types/enum/_FieldType"
import { _Hide } from "../../types/enum/_Hide"

import { useAutocomplete } from "../../hooks/useAutocomplete"

interface _Props {
  meta: _Meta
  closeModal: () => void
}

export const FormCreate: React.FC<_Props> = ({ meta, closeModal }: _Props) => {
  const [, messageSet] = useAtom(messageAtom)
  const [refreshData, refreshDataSet] = useAtom(refreshDataAtom)
  /**
   * useAutocomplete hook is initialized here so that every Autocomplete
   * component form inputs share the same hook state data. We need the state
   * to be shared because some Autocomplete inputs depend on others (ex. project/customer)
   * If it were initialized inside Autocomplete component each Autocomplete
   * component would have different state
   */
  const [autocompleteState, autocompleteDispatch] = useAutocomplete()
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
        /** hide fields that should not be showed in FormCreate */
        if (field.hide.includes(_Hide.CREATE)) return
        /** render date type fields using DatePicker component */
        if (field.type === _FieldType.DATE)
          return <DatePicker key={index} field={field} form={form}></DatePicker>
        /** render autocomplete type fileds with Autcomplete component */
        if (field.type === _FieldType.AUTOCOMPLETE)
          return (
            <Autocomplete
              key={index}
              field={field}
              autocompleteState={autocompleteState}
              autocompleteDispatch={autocompleteDispatch}
            ></Autocomplete>
          )
        /** render selection type fields using Select component  */
        if (field.type === _FieldType.SELECTION)
          return (
            <Select
              key={index}
              /** defaultValue not working anymore with current mantine version */
              field={"asdfasdf"}
              defaultValue={"user"}
              label={field.header}
              data={field.selection}
              {...form.getInputProps(field.key)}
              mb={"sm"}
            ></Select>
          )
        /** all other fields are rendered with TextInput component */
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
