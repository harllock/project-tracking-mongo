import { createStyles } from "@mantine/core"

import { Header } from "./Header"

import { _Meta } from "../interfaces/_Meta"

const useStyles = createStyles((theme) => ({
  headers: {
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
  meta: _Meta
}

export const Headers: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  const fields = meta.table.tableFields

  return (
    <div className={classes.headers}>
      {fields.map((field, index) => {
        return <Header key={index} field={field}></Header>
      })}
    </div>
  )
}
