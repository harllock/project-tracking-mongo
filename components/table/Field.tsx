import { createStyles, Text } from "@mantine/core"
import { useAtom } from "jotai"

import { FieldContent } from "./FieldContent"

import { _Meta } from "../../types/interfaces/_Meta"
import { _TableField } from "../../types/interfaces/_TableField"
import { selectedRowAtom } from "../../store/"

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

  /** remove border if the row is colored (selected, closed..) */
  colored: {
    borderBottomStyle: "none",
    borderRightStyle: "none",
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
  const { classes, cx } = useStyles({ width })

  const [selectedRow] = useAtom(selectedRowAtom)
  const resource = meta.resourceName

  return (
    <div
      className={cx(classes.field, {
        [classes.colored]: row.status === "closed",
        [classes.colored]: selectedRow._id === row._id,
      })}
    >
      <Text className={classes.tableFieldText}>
        <FieldContent field={field} meta={meta} row={row}></FieldContent>
      </Text>
    </div>
  )
}
