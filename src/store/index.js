import { readable, writable } from "svelte/store";

// Const
export const DEFAULT_PAGE = readable(1); // デフォルトに表示されるページ番号
export const ONE_PAGE_LINES = readable(4); // 一ページに表示される件数

export const dataList = writable([]);
export const isClearTerms = writable(false);
