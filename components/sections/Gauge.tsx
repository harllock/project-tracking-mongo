import { createStyles, Text } from "@mantine/core"
import { useAtom } from "jotai"

import { _MainGauge } from "../../types/interfaces/_MainGauge"
import { mainGaugesAtom } from "../../store"

interface _StylesProps {
  background: string
  fontSize: number
}

const useStyles = createStyles(
  (theme, { background, fontSize }: _StylesProps) => ({
    gauge: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    gaugeTitle: {
      color: "white",
      fontWeight: "bold",
      fontSize: "12px",
      whiteSpace: "nowrap",
    },

    gaugeBadge: {
      borderRadius: 20,
      width: "auto",
      minWidth: 60,
      minHeight: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      whiteSpace: "nowrap",
      background,
    },

    gaugeText: {
      color: "white",
      fontWeight: "bold",
      fontSize,
    },
  })
)

interface _Props {
  gauge: _MainGauge
}

export const Gauge: React.FC<_Props> = ({ gauge }: _Props) => {
  const [mainGauges] = useAtom(mainGaugesAtom)

  const gaugeValue = mainGauges[gauge.target]

  const { classes } = useStyles({
    background: gauge.color,
    fontSize: _getFontSize(gaugeValue),
  })

  return (
    <div className={classes.gauge}>
      <Text className={classes.gaugeTitle} size={3}>
        {gauge.label.toUpperCase()}
      </Text>
      <div className={classes.gaugeBadge}>
        <Text className={classes.gaugeText}>{gaugeValue}</Text>
      </div>
    </div>
  )
}

/** change gauge text size based on text characters number */
function _getFontSize(gaugeValue: number): number {
  let size = 0

  if (gaugeValue === (null || undefined)) {
    return size
  } else {
    const stringText = gaugeValue.toString()

    if (stringText.length <= 5) {
      size = 16
    } else if (stringText.length <= 8 && stringText.length > 5) {
      size = 14
    } else if (stringText.length <= 10 && stringText.length > 8) {
      size = 12
    }
  }
  return size
}
