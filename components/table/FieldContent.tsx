import { createStyles } from "@mantine/core"
import dayjs from "dayjs"

import { EditIcon, EditAndKeyIcon } from "./Icons"

import { _Meta } from "../../types/interfaces/_Meta"
import { _TableField } from "../../types/interfaces/_TableField"
import { _FieldType } from "../../types/enum/_FieldType"

const useStyles = createStyles(() => ({
  fieldContent: {
    paddingLeft: 16,
  },
}))

interface _Props {
  field: _TableField
  meta: _Meta
  onClickKeyHandler: () => void
  resource: string
  row: {
    [key: string]: string
  }
}

export const FieldContent: React.FC<_Props> = ({
  field,
  meta,
  onClickKeyHandler,
  resource,
  row,
}: _Props) => {
  const { classes } = useStyles()
  const key = field.key
  const isIcon = field.type === _FieldType.ICON

  const content = () => {
    if (isIcon) {
      /** if current field resource is user render edit and key icons */
      if (resource === "user") {
        return (
          <EditAndKeyIcon
            onEditClick={onClickKeyHandler}
            meta={meta}
            row={row}
          />
        )
      } else {
        return <EditIcon onEditClick={onClickKeyHandler} row={row} />
      }
    }
    if (field.type === _FieldType.DATE) {
      return dayjs(row[key]).format("DD/MM/YYYY")
    } else {
      return row[key]
    }
  }

  return <div className={classes.fieldContent}>{content()}</div>
}
