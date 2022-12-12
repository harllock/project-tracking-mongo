import { createStyles } from "@mantine/core"
import { useAtom } from "jotai"

import { Row } from "./Row"
import { ClickWrapper } from "../ui/ClickWrapper"

import { _Meta } from "../../types/interfaces/_Meta"
import { dataAtom, selectedRowAtom } from "../../store"

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
  openModal: () => void
}

/**
 * this container holds all table rows
 */
export const Rows: React.FC<_Props> = ({ meta, openModal }: _Props) => {
  const { classes } = useStyles()

  const [data] = useAtom(dataAtom)
  const [selectedRow, selectedRowSet] = useAtom(selectedRowAtom)

  /** when user click the row */
  const onClickHandler = (row: {}) => {
    console.log("onClickHandler", row)
  }

  /** when user click the row while pressing osx cmd or windows ctrl */
  const onClickKeyHandler = (row: {}) => {
    /**
     * this handler open a modal which holds the FormUpdateDelete component;
     * it also set the selectedRowAtom with the current map iteration row
     */
    openModal()
    selectedRowSet(row)
  }

  return (
    <div className={classes.rows}>
      {
        /** iterate over fetched data stored in data atom */
        data.map((row, index) => {
          /**
           * note the use of closures with handlers to make each ClickWrapper
           * components holding a different row from the iteration
           */
          return (
            <ClickWrapper
              key={index}
              onClickHandler={() => onClickHandler(row)}
              onClickKeyHandler={() => onClickKeyHandler(row)}
            >
              <Row key={index} meta={meta} row={row}></Row>
            </ClickWrapper>
          )
        })
      }
    </div>
  )
}
