import { createStyles } from "@mantine/core"

import { global } from "../../config"

interface _StyleProps {
  width: string
  color: string
}

const useStyles = createStyles((theme, { width, color }: _StyleProps) => ({
  tableHeaderCell: {
    borderBottomStyle: "solid",
    borderBottomColor: theme.colors.gray[2],
    borderRightStyle: "solid",
    borderRightColor: theme.colors.gray[2],
    fontWeight: "bold",
    width,
    color,
  },

  headerLeftPadding: {
    paddingLeft: 16,
  },
}))

interface _Props {
  field: {
    header: string
    width: string
    color: string
  }
}

const TableHeaderCell: React.FC<_Props> = ({ field }) => {
  const width = field.width
  /** field color is used to hide some header fields using white color;
   *  keeping the vertical space between bottom border and the hidden text
   */
  const color = field.color ? field.color : global.colors.grey

  const { classes } = useStyles({ width, color })

  return (
    <div className={classes.tableHeaderCell}>
      <div className={classes.headerLeftPadding}>{field.header}</div>
    </div>
  )
}

export default TableHeaderCell
