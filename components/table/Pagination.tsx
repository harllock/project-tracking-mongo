import { createStyles, Pagination as MantinePagination } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"

import { global } from "../../config"
import { _Meta } from "../../types/interfaces/_Meta"

import { mainGaugesAtom, offsetAtom } from "../../store"

const useStyles = createStyles(() => ({
  pagination: {
    heigh: 70,
    minHeight: 70,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}))

interface _Props {
  meta: _Meta
}

export const Pagination: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  const [mainGauges] = useAtom(mainGaugesAtom)
  const [, offsetSet] = useAtom(offsetAtom)

  const [mantineOffset, mantineOffsetSet] = useState(1)

  /** total number of row per page */
  const pageSize = global.pageSize
  /** number of rows fetched from db */
  const rowCount = mainGauges.count

  const changePageHandler = async (page: number) => {
    /** highlight current page button using local state */
    mantineOffsetSet(page)
    /**
     * if we are on page 1 just set the offset (skip) to 0
     * from page 2 onwards subtract 1 from page button number and multiply
     * for page size: page 2 becomes 10; page 3 becomes 20, page 4 becomes 30;
     * then mongodb will skip 10 or 20 or 30 first rows
     **/
    const offset = page === 1 ? 0 : (page - 1) * pageSize
    /** offset atom is used by useSearch hook that forward it to the apis */
    offsetSet(offset)
  }

  /**
   * Mantine Pagination:
   * onChange: trigger a new fetch on the db (using skip and limit)
   * page: is used to highlight curren page button number (using local state)
   * total: total number page buttons to be displayed in navigation bar
   */
  return (
    <div className={classes.pagination}>
      <MantinePagination
        onChange={changePageHandler}
        page={mantineOffset}
        total={_setPagesNumber(rowCount, pageSize)}
      ></MantinePagination>
    </div>
  )
}

function _setPagesNumber(rowCount: number, pageSize: number): number {
  /**
   * to determine number of pages (page buttons) rowCount should be divided
   * by page size and round to ceil
   */
  const pageNumber = Math.ceil(rowCount / pageSize)
  return pageNumber
}
