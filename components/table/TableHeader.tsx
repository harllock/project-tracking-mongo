import { createStyles } from "@mantine/core"

import TableHeaderCell from "./TableHeaderCell"

const useStyles = createStyles((theme) => ({
  tableHeader: {
    height: 60,
    minHeight: 60,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}))

interface _Props {
  meta: {
    table: {
      tableFields: []
    }
  }
}

const TableHeader: React.FC<_Props> = ({ meta }) => {
  const { classes } = useStyles()

  const fields = meta.table.tableFields

  return (
    <div className={classes.tableHeader}>
      {fields.map((field, index) => {
        return <TableHeaderCell key={index} field={field}></TableHeaderCell>
      })}
    </div>
  )
}

export default TableHeader
