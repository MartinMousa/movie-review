import React from 'react';
import { useMovies } from '../context/MovieContext';

export default function SortingControls() {
  const { 
    sortOption, 
    handleSortChange, 
    sortOptions, 
    sortingMessage 
  } = useMovies();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-auto">
        <select
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent appearance-none cursor-pointer"
          aria-label="Sort movies"
        >
          {Object.entries(sortOptions).map(([key, option]) => (
            <option key={key} value={key}>
              Sort by: {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Sorting feedback message */}
      {sortingMessage && (
        <div className="text-sm text-gray-600 dark:text-gray-400 animate-fade-out">
          {sortingMessage}
        </div>
      )}
    </div>
  );
}
