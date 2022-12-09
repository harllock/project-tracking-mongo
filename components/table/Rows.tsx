import { createStyles } from "@mantine/core"
import { useAtom } from "jotai"

import Row from "./Row"

import { _Meta } from "../interfaces/_Meta"
import { dataAtom } from "../../store"

const useStyles = createStyles(() => ({
  rows: {
    height: "30vh",
    width: "100%",
    flexGrow: 1,
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Props {
  meta: _Meta
}

/**
 * this container holds all table rows
 */
const Rows: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  const [data] = useAtom(dataAtom)

  return (
    <div className={classes.rows}>
      {
        /** iterate over fetched data stored in data atom */
        data.map((row, index) => {
          return <Row key={index} meta={meta} row={row}></Row>
        })
      }
    </div>
  )
}

export default Rows
