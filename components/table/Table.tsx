import { createStyles } from "@mantine/core"

import { Headers } from "./Headers"
import { Content } from "./Content"
import { Pagination } from "./Pagination"

import { _Meta } from "../interfaces/_Meta"

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
  meta: _Meta
}

export const Table: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  return (
    <div className={classes.table}>
      <Headers meta={meta}></Headers>
      <Content meta={meta}></Content>
      <Pagination meta={meta}></Pagination>
    </div>
  )
}
