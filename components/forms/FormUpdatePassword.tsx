import { Button, createStyles, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAtom } from "jotai"

import { root } from "../../helpers/root"
import { messageAtom, refreshDataAtom } from "../../store"
import { _Meta } from "../../types/interfaces/_Meta"

const useStyles = createStyles(() => ({
  controls: {
    paddingTop: 10,
    display: "flex",
    justifyContent: "right",
  },
}))

interface _Props {
  closeModal: () => void
  meta: _Meta
  row: {
    [key: string]: string
  }
}

export const FormUpdatePassword: React.FC<_Props> = ({
  meta,
  row,
  closeModal,
}: _Props) => {
  const { classes } = useStyles()
  const [, messageSet] = useAtom(messageAtom)

  const form = useForm({ initialValues: { password: "", repeatPassword: "" } })

  interface _FormValues {
    [key: string]: string
  }

  const onSubmitHandler = async (formValues: _FormValues) => {
    const resourceApi = meta.page
    const _id = row._id
    const password = formValues.password
    const repeatPassword = formValues.repeatPassword
    const body = { _id, password, repeatPassword }

    const res = await root.httpPost(`/api/${resourceApi}/updatePassword`, body)

    messageSet(res)
    closeModal()
  }
  return (
    <form onSubmit={form.onSubmit(onSubmitHandler)}>
      <PasswordInput
        placeholder="Password"
        label="Password"
        mb="sm"
        {...form.getInputProps("password")}
      ></PasswordInput>
      <PasswordInput
        placeholder="Password"
        label="Repeat password"
        mb="sm"
        {...form.getInputProps("repeatPassword")}
      ></PasswordInput>
      <div className={classes.controls}>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
