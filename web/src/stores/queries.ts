import { getContextClient, queryStore, type RequestPolicy } from "@urql/svelte";
import { getStations } from "../queries";
import type { StationQueryWhere } from "@/types";

export const createStationsStore = (query: { where?: Partial<StationQueryWhere> } = {}, requestPolicy?: RequestPolicy) =>
  queryStore({
    client: getContextClient(),
    query: getStations,
    variables: query,
    requestPolicy
  });
