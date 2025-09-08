import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';

const INITIAL_FORM_STATE = {
    type: 'EX',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
};

const TransactionForm = ({ onSubmit, onSuccess, transactionToEdit = null }) => {
    const [formData, setFormData] = useState(
        transactionToEdit ? { ...transactionToEdit, category: transactionToEdit.category?.id || '' } : INITIAL_FORM_STATE
    );
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const { categories } = useCategories();

    useEffect(() => {
        setFormData((prev) => ({ ...prev, category: '' }));
    }, [formData.type]);

    const validate = () => {
        const newErrors = {};
        if (!formData.description.trim()) newErrors.description = 'Description is required.';
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than zero.';
        }
        if (!formData.date) newErrors.date = 'Date is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validate()) return;

        setLoading(true);
        try {
            await onSubmit(formData);
            onSuccess?.();
            if (!transactionToEdit) setFormData(INITIAL_FORM_STATE);
        } catch (err) {
            setApiError(err.message || 'Failed to save transaction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isEditing = !!transactionToEdit;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {apiError && <div className="text-red-600 bg-red-100 p-3 rounded-md text-sm">{apiError}</div>}

            {/* Type + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type *</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="EX">Expense</option>
                        <option value="IN">Income</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date *</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
            </div>

            {/* Amount */}
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount *</label>
                <input
                    type="number"
                    step="0.01"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="0.00"
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g., Groceries from the store"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="">Select a category</option>
                    {categories
                        .filter((cat) => cat.type === formData.type)
                        .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : isEditing ? 'Update Transaction' : 'Add Transaction'}
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
