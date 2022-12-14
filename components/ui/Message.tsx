import { createStyles } from "@mantine/core"
import { useAtom } from "jotai"
import { useEffect } from "react"

import { messageAtom } from "../../store"

const useStyles = createStyles(() => ({
  message: {
    color: "white",
    fontWeight: "bold",
  },
}))

/** handle application messages inside the footer */
export const Message: React.FC = () => {
  const { classes } = useStyles()

  const [message, messageSet] = useAtom(messageAtom)

  /**
   * when message atom change start a timer to reset the message to null;
   * this make the footer status message disappear after 10 seconds
   */
  useEffect(() => {
    setTimeout(() => {
      messageSet(null)
    }, 10000)
  }, [message])

  return <div className={classes.message}>{message && message.text}</div>
}
