import { createStyles } from "@mantine/core"

import { Field } from "./Field"

import { _Meta } from "../../types/interfaces/_Meta"
import { _Row } from "../../types/interfaces/_Row"

const useStyles = createStyles((theme) => ({
  row: {
    width: "100%",
    height: 40,
    minHeight: 40,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
}))

interface _Props {
  meta: _Meta
  row: _Row
}

export const Row: React.FC<_Props> = ({ meta, row }: _Props) => {
  const { classes } = useStyles()

  const fields = meta.table.tableFields

  return (
    <div className={classes.row}>
      {fields.map((field, index) => {
        return <Field key={index} meta={meta} row={row} field={field}></Field>
      })}
    </div>
  )
}
