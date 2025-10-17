import React, { useEffect, useState } from 'react';
import { designService } from '../services/designs';
import { Design, Category, User } from '../types';
import DesignCard from '../components/DesignCard';
import api from '../services/api';

const Gallery: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [designers, setDesigners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [selectedDesigner, setSelectedDesigner] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState('-created_at');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadDesigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, selectedDesigner, sortBy, currentPage]);

  const loadInitialData = async () => {
    try {
      // Load categories
      const categoriesData = await designService.getCategories();
      setCategories(categoriesData);

      // Load designers
      const designersResponse = await api.get('/users/designers/', {
        params: { is_approved: true, page_size: 100 }
      });
      setDesigners(designersResponse.data.results);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadDesigns = async () => {
    try {
      setLoading(true);
      setError('');

      const params: any = {
        page: currentPage,
        page_size: 12,
        ordering: sortBy,
        status: 'approved',
      };

      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedDesigner) params.designer = selectedDesigner;

      const response = await designService.getDesigns(params);
      setDesigns(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / 12));
    } catch (err: any) {
      setError('Failed to load designs. Please try again.');
      console.error('Error loading designs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value ? Number(e.target.value) : '');
    setCurrentPage(1);
  };

  const handleDesignerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDesigner(e.target.value ? Number(e.target.value) : '');
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDesigner('');
    setSortBy('-created_at');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-pink-600 hover:bg-pink-50 border border-pink-200'
        }`}
      >
        Previous
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === i
              ? 'bg-pink-600 text-white'
              : 'bg-white text-gray-700 hover:bg-pink-50 border'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-pink-600 hover:bg-pink-50 border border-pink-200'
        }`}
      >
        Next
      </button>
    );

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Design Gallery</h1>
          <p className="text-lg text-gray-600">
            Explore {totalCount} stunning mehndi designs from talented artists
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Designs
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, tags, or description..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.designs_count})
                  </option>
                ))}
              </select>
            </div>

            {/* Designer Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designer
              </label>
              <select
                value={selectedDesigner}
                onChange={handleDesignerChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Designers</option>
                {designers.map((designer) => (
                  <option key={designer.id} value={designer.id}>
                    {designer.first_name} {designer.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Sort By */}
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="-created_at">Newest First</option>
                <option value="created_at">Oldest First</option>
                <option value="-likes_count">Most Liked</option>
                <option value="-views_count">Most Viewed</option>
                <option value="title">Title (A-Z)</option>
                <option value="-title">Title (Z-A)</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory || selectedDesigner || sortBy !== '-created_at') && (
              <button
                onClick={handleClearFilters}
                className="w-full sm:w-auto mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : designs.length === 0 ? (
          /* No Results */
          <div className="text-center py-16">
            <svg
              className="mx-auto w-24 h-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Designs Found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or search query to find what you're looking for
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Design Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {designs.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8">
                <div className="flex flex-wrap justify-center">
                  {renderPagination()}
                </div>
              </div>
            )}

            {/* Results Info */}
            <div className="text-center text-gray-600 mt-4">
              Showing {(currentPage - 1) * 12 + 1} - {Math.min(currentPage * 12, totalCount)} of {totalCount} designs
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;