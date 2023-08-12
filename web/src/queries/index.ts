import { gql } from "@urql/svelte";

export const getStations = gql`
query($where: Station_filter) {
  stations(where: $where) {
    id
    owner
  }
}
`
