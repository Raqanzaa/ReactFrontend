// src/utils/formatters.js

// 1. A single, internal helper for the core currency formatting.
// It uses Math.abs() to prevent double negative signs (e.g., "- -Rp 50.000").
const _formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Math.abs(amount || 0));
};


// This function now uses the helper.
// It's for formatting a raw number, where the sign is based on the number's value.
export const formatCurrency = (amount) => {
    const formatted = _formatToIDR(amount);
    const sign = amount >= 0 ? '+ ' : '- ';
    return sign + formatted;
};


// This function also uses the helper, removing duplicated code.
// It's for formatting a transaction, where the sign and color are based on the transaction 'type'.
export const formatTransactionDisplay = (transaction) => {
    const { amount = 0, type = 'EX' } = transaction || {};
    const isIncome = type === 'IN';

    const colorClass = isIncome ? 'text-green-600' : 'text-red-600';
    const formattedAmount = _formatToIDR(amount); // Re-uses the helper function
    const sign = isIncome ? '+ ' : '- ';
    const text = sign + formattedAmount;

    return {
        text,
        colorClass,
    };
};


export const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

export const TransactionIcon = (type) => {
    if (type === 'IN') return '⬇️';
    if (type === 'EX') return '⬆️';
    return '🔄';
};