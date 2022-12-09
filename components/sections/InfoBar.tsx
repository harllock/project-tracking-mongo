import { createStyles } from "@mantine/core"

import { _Meta } from "../interfaces/_Meta"

const useStyles = createStyles((theme) => ({
  infoBar: {
    backgroundColor: theme.colors.dark[4],
    width: "20%",
    minWidth: "20%",
    marginRight: 20,
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Props {
  meta: _Meta
}

const InfoBar: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  return <div className={classes.infoBar}>InfoBar</div>
}

export default InfoBar
