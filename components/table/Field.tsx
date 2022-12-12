import { createStyles, Text } from "@mantine/core"

import { FieldContent } from "./FieldContent"

import { _Meta } from "../../types/interfaces/_Meta"
import { _TableField } from "../../types/interfaces/_TableField"

interface _StylesProps {
  width: string
}

const useStyles = createStyles((theme, { width }: _StylesProps) => ({
  field: {
    height: 25,
    width,
    borderBottomStyle: "solid",
    borderBottomColor: theme.colors.gray[2],
    borderRightStyle: "solid",
    borderRightColor: theme.colors.gray[2],
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

  tableFieldText: {
    overflow: "hidden",
  },
}))

interface _Props {
  field: _TableField
  meta: _Meta
  row: {
    [key: string]: string
  }
}

export const Field: React.FC<_Props> = ({ field, meta, row }: _Props) => {
  const width = field.width
  const { classes } = useStyles({ width })

  const resource = meta.resourceName

  return (
    <div className={classes.field}>
      <Text className={classes.tableFieldText}>
        <FieldContent field={field} meta={meta} row={row}></FieldContent>
      </Text>
    </div>
  )
}
