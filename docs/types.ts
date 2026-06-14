/** A row in a component's API (props/events/slots) table. */
export interface ApiRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}
