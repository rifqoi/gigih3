import React from "react";

type SearchBarType = {
  setQuerySearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: React.FormEventHandler<HTMLFormElement>;
};

const SearchBar: React.FC<SearchBarType> = ({ onSearch, setQuerySearch }) => {
  return (
    <>
      <form onSubmit={onSearch}>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-zinc-700 bg-zinc-700 p-4 pl-10 text-sm text-white focus:border-zinc-900 focus:ring-zinc-900 "
            placeholder="Search Videos..."
            onChange={(e) => {
              setQuerySearch(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="absolute bottom-2.5 right-2.5 rounded-lg bg-zinc-600 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-300 "
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
