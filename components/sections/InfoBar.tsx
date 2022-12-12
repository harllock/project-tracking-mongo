import { createStyles, Title } from "@mantine/core"

import { GaugesPanel } from "./GaugesPanel"

import { _Meta } from "../../types/interfaces/_Meta"

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

  infoBarTitle: {
    height: 100,
    minHeight: 100,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

interface _Props {
  meta: _Meta
}

export const InfoBar: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  const title = meta.page.toUpperCase()

  return (
    <div className={classes.infoBar}>
      <div className={classes.infoBarTitle}>
        <Title color="white" order={3}>
          {title}
        </Title>
      </div>
      <GaugesPanel meta={meta}></GaugesPanel>
    </div>
  )
}
