import { _FetchType } from "../enum/_FetchType"

export interface _MainGauge {
  color: string
  fetch: _FetchType
  label: string
  name: string
  target: string
}
