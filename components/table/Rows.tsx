import { createStyles } from "@mantine/core"
import { useAtom } from "jotai"

import { Row } from "./Row"

import { _Meta } from "../../types/interfaces/_Meta"
import { _Row } from "../../types/interfaces/_Row"
import { dataAtom, selectedRowAtom } from "../../store"

const useStyles = createStyles((theme) => ({
  rows: {
    height: "30vh",
    width: "100%",
    flexGrow: 1,
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  },

  selected: {
    backgroundColor: theme.colors.grape[2],
  },

  closed: {
    backgroundColor: theme.colors.gray[4],
    fontStyle: "italic",
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
  const { classes, cx } = useStyles()

  const [data] = useAtom(dataAtom)
  const [selectedRow, selectedRowSet] = useAtom(selectedRowAtom)
  const isRowSelected = selectedRow._id ? true : false

  /** when user click the row */
  const onClickHandler = (row: _Row) => {
    /**
     * this click select a row or unselect it if it is already selected;
     * if objectId of selectedRow atom is the same as row (current component
     * iteration) then the row is already selected and the click unselect it;
     * if the two objectId are different or there isn't a currentRow
     * (nothing is selected) then the click select the row
     */
    selectedRow._id && selectedRow._id === row._id
      ? selectedRowSet({})
      : selectedRowSet(row)
  }

  /** when user click the row while pressing osx cmd or windows ctrl */
  const onClickKeyHandler = (row: _Row) => {
    /**
     * this handler open a modal which holds the FormUpdateDelete component;
     * it also set the selectedRow atom with the current map iteration row
     */
    openModal()
    selectedRowSet(row)
  }

  return (
    <div className={classes.rows}>
      {
        /** iterate over fetched data stored in data atom */
        data.map((row: _Row, index) => {
          /**
           * note the use of closures with handlers to make each ClickWrapper
           * components holding a different row from the iteration
           */
          return (
            <div
              className={cx({
                [classes.closed]: row.status === "closed",
                [classes.selected]:
                  isRowSelected && selectedRow._id === row._id,
              })}
              key={index}
            >
              <Row
                meta={meta}
                onClickHandler={() => onClickHandler(row)}
                onClickKeyHandler={() => onClickKeyHandler(row)}
                row={row}
              ></Row>
            </div>
          )
        })
      }
    </div>
  )
}
