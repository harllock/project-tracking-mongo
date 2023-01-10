import { createStyles, TextInput } from "@mantine/core"
import { useAtom } from "jotai"

import { searchStringAtom } from "../../store"

const useStyles = createStyles(() => ({
  search: {
    width: 300,
    /** margin for DateRangePicker component */
    marginLeft: 20,
  },
}))

export const Search: React.FC = () => {
  const { classes } = useStyles()

  const [searchString, searchStringSet] = useAtom(searchStringAtom)

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    searchStringSet(event.currentTarget.value)
  }

  return (
    <div>
      <TextInput
        className={classes.search}
        placeholder="Magic Search"
        value={searchString}
        onChange={onChangeHandler}
      ></TextInput>
    </div>
  )
}
