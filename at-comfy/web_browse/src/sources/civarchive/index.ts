import type { BrowseSourceDefinition } from "../types";

export const civarchiveSource: BrowseSourceDefinition = {
  id: "civarchive",
  label: "CivArchive",
  defaultSearchState: { q: "", kind: "version", page: 1 },
  filterSchema: [{ id: "kind", type: "select", options: ["version", "file", "user"] }],
};
