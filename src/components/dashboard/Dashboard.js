import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTransactions } from '../../hooks/useTransactions';
import { useBudgets } from '../../hooks/useBudgets';
import { useGoals } from '../../hooks/useGoals';
import FinancialSummary from './FinancialSummary';
import RecentTransactions from './RecentTransactions';
import BudgetProgress from './BudgetProgress';
import GoalsProgress from './GoalsProgress';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { transactions, loading: transactionsLoading } = useTransactions();
    const { budgets, loading: budgetsLoading } = useBudgets();
    const { goals, loading: goalsLoading } = useGoals();

    if (transactionsLoading || budgetsLoading || goalsLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>Welcome, {user.first_name || user.username}!</span>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Welcome back, {user?.first_name || user?.username}!
                    </h1>

                    <FinancialSummary transactions={transactions} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <RecentTransactions transactions={transactions.slice(0, 5)} />
                        <BudgetProgress budgets={budgets} />
                    </div>

                    <div className="mt-8">
                        <GoalsProgress goals={goals} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;