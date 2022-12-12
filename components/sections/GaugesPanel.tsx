import { createStyles, Grid } from "@mantine/core"

import { Gauge } from "./Gauge"

import { _Meta } from "../../types/interfaces/_Meta"

const useStyles = createStyles(() => ({
  panel: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },

  grid: {
    justifyContent: "space-evenly",
  },
}))

interface _Props {
  meta: _Meta
}

export const GaugesPanel: React.FC<_Props> = ({ meta }: _Props) => {
  const { classes } = useStyles()

  const gauges = meta.gauges.main

  return (
    <div className={classes.panel}>
      <Grid className={classes.grid} columns={12}>
        {gauges.map((gauge, index) => {
          return (
            <Grid.Col key={index} span={6}>
              <Gauge gauge={gauge}></Gauge>
            </Grid.Col>
          )
        })}
      </Grid>
    </div>
  )
}
