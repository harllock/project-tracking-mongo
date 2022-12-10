interface _Props {
  children: JSX.Element
  onClickHandler: () => void
  onClickKeyHandler: () => void
}

export const ClickWrapper: React.FC<_Props> = ({
  children,
  onClickHandler,
  onClickKeyHandler,
}: _Props) => {
  return (
    <span
      onClick={(e) => {
        /**
         * if click event has mac metaKey (cmd) or windows ctrlKey properties
         * (user pressed one of that keys while clicking) then trigger
         * onClickKeyHandler, otherwise trigger onClickHandler
         */
        e.metaKey || e.ctrlKey ? onClickKeyHandler() : onClickHandler()
      }}
    >
      {children}
    </span>
  )
}
