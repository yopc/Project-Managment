import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, totalProjects, filteredCount }) => {
  return (
    <div className="mb-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search projects by title, description, or creator..."
            className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {searchTerm && (
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-500">
              Showing {filteredCount} of {totalProjects} projects
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;