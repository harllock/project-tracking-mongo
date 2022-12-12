import { createStyles } from "@mantine/core"

import { _Meta } from "../../types/interfaces/_Meta"
import { _TableField } from "../../types/interfaces/_TableField"

const useStyles = createStyles(() => ({
  fieldContent: {
    paddingLeft: 16,
  },
}))

interface _Props {
  field: _TableField
  meta: _Meta
  row: {
    [key: string]: string
  }
}

export const FieldContent: React.FC<_Props> = ({
  field,
  meta,
  row,
}: _Props) => {
  const { classes } = useStyles()
  const key = field.key

  return <div className={classes.fieldContent}>{row[key]}</div>
}
