import PrettyError from "pretty-error"
import chalk from "chalk"

const prettyError = new PrettyError()

interface _Error {
  section: string
  summary: string
  where: string
  stack: any
}

/**
 * format client side (devtools) and server side error with colors
 * and text helpers
 */
export default ({ section, summary, where, stack }: _Error): void => {
  const log = console.log
  const group = console.group

  log(chalk.red.bold("!!! ERROR !!!"))
  log(chalk.red.bold(`SECTION: ${section}`))
  group()
  log(chalk.yellow.bold(`SUMMARY: ${summary}`))
  log(chalk.blue.bold(`WHERE: ${where}`))
  log(prettyError.render(stack))
}
