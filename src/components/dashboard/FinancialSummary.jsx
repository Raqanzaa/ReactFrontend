import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/formatters';

const FinancialSummary = ({ transactions = [] }) => {
    const { income, expenses, net } = useMemo(() => {
        const income = transactions
            .filter(t => t.type === "IN" && !t.is_transfer)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const expenses = transactions
            .filter(t => t.type === "EX" && !t.is_transfer)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const net = income - expenses;

        return { income, expenses, net };
    }, [transactions]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Income Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100">
                        <span className="text-green-600 text-2xl">💰</span>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-600">Income</h3>
                        <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(income)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Expenses Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100">
                        <span className="text-red-600 text-2xl">💸</span>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-600">Expenses</h3>
                        <p className="text-2xl font-bold text-red-600">
                            {formatCurrency(expenses * -1)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Net Worth Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100">
                        <span className="text-blue-600 text-2xl">📊</span>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-600">Net</h3>
                        <p
                            className={`text-2xl font-bold ${net >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {formatCurrency(net)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialSummary;
