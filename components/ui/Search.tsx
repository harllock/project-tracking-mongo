import { createStyles, TextInput } from "@mantine/core"
import { useAtom } from "jotai"

import { magicSearchAtom } from "../../store"

const useStyles = createStyles(() => ({
  search: {
    width: 300,
    /** margin for DateRangePicker component */
    marginLeft: 20,
  },
}))

export const Search: React.FC = () => {
  const { classes } = useStyles()

  const [magicSearch, magicSearchSet] = useAtom(magicSearchAtom)

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    magicSearchSet(event.currentTarget.value)
  }

  return (
    <div>
      <TextInput
        className={classes.search}
        placeholder="Magic Search"
        value={magicSearch}
        onChange={onChangeHandler}
      ></TextInput>
    </div>
  )
}
