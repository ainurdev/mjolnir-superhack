import { getContextClient, queryStore } from "@urql/svelte";
import { getStations } from "../queries";
import type { StationQueryWhere } from "@/types";

export const createStationsStore = (query: { where?: Partial<StationQueryWhere> } = {}) =>
  queryStore({
    client: getContextClient(),
    query: getStations,
    variables: query,
  });
