'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Banknote, Users, TrendingUp, DollarSign, LogOut, UserCheck, AlertCircle, CreditCard } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

interface Transaction {
    id: string;
    type: string;
    amount: number;
    status: string;
    createdAt: string;
    user: { name: string; email: string };
}

interface Stats {
    totalMembers: number;
    totalSavings: number;
    totalLoans: number;
    pendingTransactions: number;
}

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState<Stats>({
        totalMembers: 0,
        totalSavings: 0,
        totalLoans: 0,
        pendingTransactions: 0
    });
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/auth/login');
            return;
        }

        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'admin') {
            router.push('/member/dashboard');
            return;
        }

        setUser(parsedUser);
        loadDashboardData();
    }, [router]);

    const loadDashboardData = async () => {
        try {
            // Mock data for demo - in production this would come from API
            setStats({
                totalMembers: 125,
                totalSavings: 45000,
                totalLoans: 12000,
                pendingTransactions: 8
            });

            setRecentTransactions([
                {
                    id: '1',
                    type: 'deposit',
                    amount: 500,
                    status: 'completed',
                    createdAt: new Date().toISOString(),
                    user: { name: 'John Doe', email: 'john@example.com' }
                },
                {
                    id: '2',
                    type: 'withdrawal',
                    amount: 200,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    user: { name: 'Jane Smith', email: 'jane@example.com' }
                },
                {
                    id: '3',
                    type: 'loan',
                    amount: 1000,
                    status: 'approved',
                    createdAt: new Date().toISOString(),
                    user: { name: 'Mike Johnson', email: 'mike@example.com' }
                }
            ]);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#00BB77] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': case 'approved': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Banknote className="h-8 w-8 text-[#00BB77]" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Village SACCO</h1>
                                <p className="text-sm text-gray-500">Admin Dashboard</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary header with logout */}
                    <div className="flex justify-end px-4 sm:px-6 lg:px-8 pb-2">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.name}!
                    </h2>
                    <p className="text-gray-600">
                        Here&apos;s an overview of your SACCO&apos;s performance and recent activities.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Members</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+12% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Savings</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalSavings.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-[#00BB77]" />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+8% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Loans</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalLoans.toLocaleString()}</p>
                            </div>
                            <CreditCard className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+15% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Transactions</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingTransactions}</p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-yellow-600" />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-yellow-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>Requires attention</span>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{transaction.user.name}</div>
                                                <div className="text-sm text-gray-500">{transaction.user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900 capitalize">{transaction.type}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${transaction.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(transaction.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}