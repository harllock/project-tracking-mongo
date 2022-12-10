import { createStyles } from "@mantine/core"
import { useState } from "react"

import { Rows } from "./Rows"
import { Modal } from "../ui/Modal"
import { FormUpdateDelete } from "../forms/FormUpdateDelete"

import { _Meta } from "../interfaces/_Meta"

const useStyles = createStyles(() => ({
  content: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Props {
  meta: _Meta
}

export const Content: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()
  const [isModalOpen, isModalOpenSet] = useState(false)

  return (
    <div className={classes.content}>
      <Rows meta={meta} openModal={() => isModalOpenSet(true)}></Rows>
      <Modal
        onClose={() => isModalOpenSet(false)}
        opened={isModalOpen}
        size="30%"
        title="Edit item"
      >
        <FormUpdateDelete
          meta={meta}
          closeModal={() => isModalOpenSet(false)}
        ></FormUpdateDelete>
      </Modal>
    </div>
  )
}
