import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

const TransactionForm = ({ onSuccess, initialData = {} }) => {
    const [formData, setFormData] = useState({
        amount: initialData.amount || '',
        description: initialData.description || '',
        date: initialData.date || new Date().toISOString().split('T')[0],
        category: initialData.category || '',
        account: initialData.account || '',
        ...initialData
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { createTransaction } = useTransactions();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createTransaction(formData);
            onSuccess?.();
            setFormData({
                amount: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                category: '',
                account: ''
            });
        } catch (err) {
            setError(err.message || 'Failed to create transaction');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                {loading ? 'Creating...' : 'Add Transaction'}
            </button>
        </form>
    );
};

export default TransactionForm;