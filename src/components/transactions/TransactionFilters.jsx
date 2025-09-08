import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const INITIAL_FILTERS = {
    type: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: ''
};

const TransactionFilters = ({ onFiltersChange }) => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const debouncedFilters = useDebounce(filters, 500);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    useEffect(() => {
        onFiltersChange(debouncedFilters);
    }, [debouncedFilters, onFiltersChange]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Transactions</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Type Filter */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        id="type"
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">All Types</option>
                        <option value="IN">Income</option>
                        <option value="EX">Expense</option>
                    </select>
                </div>

                {/* Date Range */}
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Amount Range */}
                <div>
                    <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                    <input
                        type="number"
                        id="minAmount"
                        name="minAmount"
                        placeholder="0.00"
                        value={filters.minAmount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                    <input
                        type="number"
                        id="maxAmount"
                        name="maxAmount"
                        placeholder="0.00"
                        value={filters.maxAmount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Clear Button */}
                <div className="flex items-end">
                    <button
                        onClick={clearFilters}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionFilters;