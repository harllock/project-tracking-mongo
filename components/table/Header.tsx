import { createStyles } from "@mantine/core"

import { global } from "../../config"
import { _TableField } from "../interfaces/_TableField"

interface _StyleProps {
  width: string
  color: string
}

const useStyles = createStyles((theme, { width, color }: _StyleProps) => ({
  header: {
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
  field: _TableField
}

export const Header: React.FC<_Props> = ({ field }: _Props) => {
  const width = field.width
  /** field color is used to hide some header fields using white color;
   *  keeping the vertical space between bottom border and the hidden text
   */
  const color = field.color ? field.color : global.colors.grey

  const { classes } = useStyles({ width, color })

  return (
    <div className={classes.header}>
      <div className={classes.headerLeftPadding}>{field.header}</div>
    </div>
  )
}
