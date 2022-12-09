import { createStyles } from "@mantine/core"

import { _Meta } from "../interfaces/_Meta"

const useStyles = createStyles(() => ({
  pagination: {
    heigh: 70,
    minHeight: 70,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "purple",
  },
}))

interface _Props {
  meta: _Meta
}

const Pagination: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  return <div className={classes.pagination}>TablePagi</div>
}

export default Pagination
