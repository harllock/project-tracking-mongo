import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { root } from "../../helpers/root"
import { dataAtom, selectedRowAtom } from "../../store"
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
  const [selectedRow, selectedRowSet] = useAtom(selectedRowAtom)

  const fields = meta.table.formFields
  const resource = meta.resourceName
  console.log(5555, root.formSetInitialValues({ fields, selectedRow }))
  const form = useForm({
    initialValues: root.formSetInitialValues({ fields, selectedRow }),
  })

  const onSubmitHandler = async () => {
    console.log("FormUpdateDelete submit handler")
  }

  return <form onSubmit={form.onSubmit(onSubmitHandler)}></form>
}
