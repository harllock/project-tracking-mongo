import { createStyles } from "@mantine/core"

import TableHeader from "./TableHeader"
import TableContent from "./TableContent"
import TablePagi from "./TablePagi"

const useStyles = createStyles(() => ({
  table: {
    background: "white",
    height: "30vh",
    /**
     * set width to 100% of available space and then subtract 20px + 20px
     * to have padding as per app layout design
     */
    width: "calc(100% - 40px)",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
  },
}))

interface _Props {
  meta: object
}

const Table: React.FC<_Props> = ({ meta }) => {
  const { classes } = useStyles()

  return (
    <div className={classes.table}>
      <TableHeader meta={meta}></TableHeader>
      <TableContent meta={meta}></TableContent>
      <TablePagi meta={meta}></TablePagi>
    </div>
  )
}

export default Table
