import { createStyles } from "@mantine/core"

import { ToolBar } from "../sections/ToolBar"
import { Table } from "../table/Table"

import { _Meta } from "../../types/interfaces/_Meta"

const useStyles = createStyles(() => ({
  main: {
    width: "80%",
    minWidth: "80%",
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Props {
  meta: _Meta
}

export const Main: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <ToolBar meta={meta}></ToolBar>
      <Table meta={meta}></Table>
    </div>
  )
}
