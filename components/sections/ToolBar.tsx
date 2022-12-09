import { createStyles } from "@mantine/core"
import { useState } from "react"

import Button from "../ui/Button"
import Modal from "../ui/Modal"

import { _Meta } from "../interfaces/_Meta"

const useStyles = createStyles(() => ({
  toolBar: {
    background: "white",
    height: 100,
    minHeight: 100,
    /**
     * set width to 100% of available space and then subtract 20px + 20px
     * to have padding as per app layout design
     */
    width: "calc(100% - 40px)",
    marginBottom: 20,
    paddingLeft: 16,
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}))

interface _Props {
  meta: _Meta
}

const ToolBar: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()
  const [isModalOpen, isModalOpenSet] = useState(false)

  return (
    <div className={classes.toolBar}>
      <Modal
        title={`Add new`}
        opened={isModalOpen}
        onClose={() => isModalOpenSet(false)}
        size="30%"
      >
        <p>Modal</p>
      </Modal>
      <Button onClick={() => isModalOpenSet(true)}>Add Customer</Button>
    </div>
  )
}

export default ToolBar