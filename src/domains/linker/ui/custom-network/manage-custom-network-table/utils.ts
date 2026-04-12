import type { FilterFn } from "@tanstack/react-table";
import { deepSearch, type RegistryRowData } from "./data";

export const deepLinkFilter: FilterFn<RegistryRowData> = (row, _id, value) => {
  const q = (value as string).toLowerCase().trim();
  if (!q) return true;
  const { rowUrlMatch, nestedMatches } = deepSearch(row.original, q);
  return rowUrlMatch || nestedMatches.length > 0;
};
deepLinkFilter.autoRemove = (val: any) => !val;

export const arrIncludesSomeFilter: FilterFn<any> = (row, columnId, value: string[]) => {
  if (!value?.length) return true;
  return value.includes(row.getValue(columnId) as string);
};
arrIncludesSomeFilter.autoRemove = (val: any) => !val?.length;
