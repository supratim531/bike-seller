import React from 'react';

function Search({ setSearchBikes }) {
  return (
    <div>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          onChange={e => setSearchBikes(e.target.value)}
          className="block w-full p-4 ps-10 rounded text-sm outline outline-1 outline-slate-400 focus:outline-2 focus:outline-blue-500"
          placeholder="Search Bikes, Brands..."
          required=""
        />
        {/* <button type="submit" className="absolute px-4 py-2 end-2.5 bottom-2 font-medium rounded text-sm focus:ring-4 focus:outline-none focus:ring-blue-300 text-white bg-blue-700 hover:bg-blue-800">
          Search
        </button> */}
      </div>
    </div>
  );
}

export default Search;
