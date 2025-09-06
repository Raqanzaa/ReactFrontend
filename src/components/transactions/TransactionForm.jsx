import React, { useState, useEffect } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useCategories } from '../../hooks/useCategories';

const TransactionForm = ({ onSuccess, initialData = {}, editing = false }) => {
    const [formData, setFormData] = useState({
        type: initialData.type || 'EX', // default Expense
        amount: initialData.amount || '',
        description: initialData.description || '',
        date: initialData.date || new Date().toISOString().split('T')[0],
        category: initialData.category || '',
        ...initialData
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { createTransaction, updateTransaction } = useTransactions();
    const { categories } = useCategories();

    useEffect(() => {
        if (editing && initialData.id) {
            setFormData({
                type: initialData.type || 'EX',
                amount: initialData.amount || '',
                description: initialData.description || '',
                date: initialData.date || '',
                category: initialData.category || '',
            });
        }
    }, [editing, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (editing && initialData.id) {
                await updateTransaction(initialData.id, formData);
            } else {
                await createTransaction(formData);
            }
            onSuccess?.();
            if (!editing) {
                setFormData({
                    type: 'EX',
                    amount: '',
                    description: '',
                    date: new Date().toISOString().split('T')[0],
                    category: ''
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to save transaction');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Type *</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="IN">Income</option>
                        <option value="EX">Expense</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Amount *</label>
                <input
                    type="number"
                    step="0.01"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="0.00"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter description"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="">Select Category</option>
                    {categories
                        .filter(cat => cat.type === formData.type)
                        .map(cat => (
                            <option key={cat.id} value={cat.id}>
                                ● {cat.name}
                            </option>
                        ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                {loading ? 'Saving...' : editing ? 'Update Transaction' : 'Add Transaction'}
            </button>
        </form>
    );
};

export default TransactionForm;
