// biome-ignore-all lint/suspicious/noExplicitAny: optional
import { compareItems, type RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn, SortingFn } from "@tanstack/react-table";
import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
// ── Fuzzy sort ───
export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  const rankA = rowA.columnFiltersMeta[columnId]?.itemRank ?? 0;
  const rankB = rowB.columnFiltersMeta[columnId]?.itemRank ?? 0;

  const dir = compareItems(rankA, rankB);

  const a = rowA.getValue(columnId) as string;
  const b = rowB.getValue(columnId) as string;

  return dir === 0 ? (a > b ? 1 : a < b ? -1 : 0) : dir;
};

// ── Filter functions ──
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId) as string, value);
  addMeta({ itemRank });
  return itemRank.passed;
};
