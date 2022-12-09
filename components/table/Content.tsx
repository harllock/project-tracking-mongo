import { createStyles } from "@mantine/core"

import Rows from "./Rows"

import { _Meta } from "../interfaces/_Meta"

const useStyles = createStyles(() => ({
  content: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Props {
  meta: _Meta
}

const Content: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  return (
    <div className={classes.content}>
      <Rows meta={meta}></Rows>
    </div>
  )
}

export default Content
