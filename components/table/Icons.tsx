import { createStyles } from "@mantine/core"
import { Edit, Key, Copy } from "tabler-icons-react"
import { useAtom } from "jotai"
import { useState } from "react"

import { Modal } from "../ui/Modal"
import { FormUpdatePassword } from "../forms/FormUpdatePassword"

import { _Meta } from "../../types/interfaces/_Meta"
import { messageAtom, refreshDataAtom } from "../../store"

const useStyles = createStyles((theme) => ({
  leftIcon: {
    marginRight: 10,
  },
}))

interface _Props {
  meta: _Meta
  onEditClick: () => void
  row: {
    [key: string]: string
  }
}

/**
 * this container contains mantine edit icon used for every resource
 * except user;
 * when user click edit icon we use onClickKeyHandler from parent
 * component to open FormUpdateDelete
 */
export const EditIcon: React.FC<_Props> = ({ meta, onEditClick }: _Props) => {
  const { classes } = useStyles()

  return (
    <Edit size={16} className={classes.leftIcon} onClick={onEditClick}></Edit>
  )
}

/**
 * this container contains mantine edit and key icons and it is only
 * used for user resource;
 * when user click edit icon we use onClickKeyHandler from parent
 * component to open FormUpdateDelete;
 */
export const EditAndKeyIcon: React.FC<_Props> = ({
  meta,
  onEditClick,
  row,
}: _Props) => {
  const { classes } = useStyles()
  const [isModalOpen, isModalOpenSet] = useState(false)

  return (
    <>
      <Edit size={16} className={classes.leftIcon} onClick={onEditClick} />
      <Key size={16} onClick={() => isModalOpenSet(true)} />
      <Modal
        title="Change password"
        opened={isModalOpen}
        onClose={() => isModalOpenSet(false)}
        size="30%"
      >
        <FormUpdatePassword
          meta={meta}
          row={row}
          closeModal={() => isModalOpenSet(false)}
        ></FormUpdatePassword>
      </Modal>
    </>
  )
}

/**
 * this container contains mantine edit and duplicate icons only used
 * for activity resource;
 * when user click edit icon we use onClickKeyHandler from parent
 * component to open FormUpdateDelete;
 */
export const EditAndDuplicateIcon: React.FC = ({ meta, row, onEditClic }) => {
  const { classes } = useStyles()
  const [refreshData, refreshDataSet] = useAtom(refreshDataAtom)
  const [, messageSet] = useAtom(messageAtom)

  const onDuplicateIconClick = async (meta, row) => {}

  return (
    <>
      <Edit></Edit>
      <Copy></Copy>
    </>
  )
}
