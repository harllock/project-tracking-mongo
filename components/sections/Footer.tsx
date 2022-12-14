import { createStyles } from "@mantine/core"
import { useAtom } from "jotai"

import { Message } from "../ui/Message"

import { global } from "../../config"
import { messageAtom } from "../../store"

const colors = global.colors

interface _StyledProps {
  background: string
}

const useStyles = createStyles((_theme, { background }: _StyledProps) => ({
  footer: {
    height: 70,
    minHeight: 70,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background,
  },
}))

export const Footer: React.FC = () => {
  const [message] = useAtom(messageAtom)

  /**
   * set Footer background color
   * set to blue if message Atom is null
   * set to green if message Atom is present and it is a success message
   * set to red if message Atom is present and it is not a success message
   */
  const background =
    message === null
      ? colors.blue
      : message.status === "success"
      ? colors.green
      : colors.red

  const { classes } = useStyles({ background })

  return (
    <div className={classes.footer}>
      <Message></Message>
    </div>
  )
}
