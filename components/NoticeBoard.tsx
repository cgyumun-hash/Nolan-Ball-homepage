"use client";

import { useState } from "react";

export default function NoticeBoard({
  total = 1,
  empty = false,
  boardName = "notices",
}: {
  total?: number;
  empty?: boolean;
  boardName?: string;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section className="wrap-in pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[180px] max-b580:pt-[100px] max-b580:pb-[120px]">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[16px] text-ink-500">Total {total}</span>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="grid h-10 w-10 place-items-center border border-line text-ink-900 transition-colors hover:border-brand-500 hover:text-brand-500"
          aria-label={`Search ${boardName}`}
        >
          <SearchIcon />
        </button>
      </div>

      <div className="overflow-x-auto border-t-2 border-ink-900">
        <table className="w-full min-w-[720px] table-fixed border-collapse text-center">
          <caption className="sr-only">{boardName} list</caption>
          <colgroup>
            <col className="w-[13%]" />
            <col />
            <col className="w-[18%]" />
            <col className="w-[11%]" />
            <col className="w-[13%]" />
          </colgroup>
          <thead>
            <tr className="h-[64px] border-b border-line bg-[#fafafa] text-[16px] font-bold">
              <th>Number</th>
              <th>Title</th>
              <th>Writer</th>
              <th>Views</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {empty ? (
              <tr className="h-[100px] border-b border-line text-[15px] text-ink-500">
                <td colSpan={5}>No posts available.</td>
              </tr>
            ) : (
              <tr className="h-[72px] border-b border-line text-[16px]">
              <td>
                <strong className="inline-flex h-[30px] items-center justify-center rounded-full bg-brand-500 px-3 text-[13px] text-white">
                  Notice
                </strong>
              </td>
              <td className="px-5 text-left">
                <button className="transition-colors hover:text-brand-500">Notice example</button>
              </td>
              <td>hakambio</td>
              <td>94</td>
              <td>10-28</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[110] grid place-items-center bg-black/55 px-5" onMouseDown={() => setSearchOpen(false)}>
          <div
            className="relative w-full max-w-[560px] bg-white p-10 shadow-2xl max-b580:p-6"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-[0px] leading-none text-ink-500 hover:text-ink-900"
              aria-label="Close search"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 3l14 14M17 3 3 17" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              ×
            </button>
            <h2 className="mb-7 text-[24px] font-bold">Search</h2>
            <form className="flex gap-2" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="notice-filter" className="sr-only">Search field</label>
              <select id="notice-filter" className="h-12 border border-line bg-white px-3 outline-none focus:border-brand-500">
                <option>Title</option>
                <option>Content</option>
                <option>Title + Content</option>
                <option>Writer</option>
              </select>
              <label htmlFor="notice-query" className="sr-only">Search term</label>
              <input
                id="notice-query"
                type="search"
                required
                placeholder="Enter a search term"
                className="h-12 min-w-0 flex-1 border border-line px-4 outline-none focus:border-brand-500"
              />
              <button type="submit" className="grid h-12 w-12 shrink-0 place-items-center bg-ink-900 text-white hover:bg-brand-500" aria-label="Search">
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
