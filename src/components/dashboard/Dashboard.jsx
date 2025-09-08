import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTransactions } from '../../hooks/useTransactions';
import { useBudgets } from '../../hooks/useBudgets';
import { useGoals } from '../../hooks/useGoals';
import Navbar from '../common/Navbar';
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
            <Navbar />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Welcome back, {user ? (user.first_name || user.username) + (user.last_name ? ` ${user.last_name}` : "") : "Guest"}!
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