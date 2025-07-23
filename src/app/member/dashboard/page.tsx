'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Banknote, 
  PiggyBank, 
  CreditCard, 
  Send, 
  TrendingUp, 
  Clock,
  Plus,
  Eye,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: string
  isActive: boolean
}

interface Saving {
  id: string
  amount: number
  currency: string
  status: string
  createdAt: string
}

interface Loan {
  id: string
  amount: number
  interest: number
  reason: string
  status: string
  dueDate: string | null
  createdAt: string
}

interface VirtualCard {
  id: string
  maskedPan: string | null
  balance: number
  currency: string
  status: string
}

export default function MemberDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [savings, setSavings] = useState<Saving[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const [cards, setCards] = useState<VirtualCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    // Fetch dashboard data
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // This would normally fetch from API
      // For demo, we'll use mock data
      setSavings([
        {
          id: '1',
          amount: 750.00,
          currency: 'USDT',
          status: 'COMPLETED',
          createdAt: '2025-01-15T10:00:00Z'
        },
        {
          id: '2',
          amount: 250.00,
          currency: 'USDT',
          status: 'PENDING',
          createdAt: '2025-01-20T14:30:00Z'
        }
      ])

      setLoans([
        {
          id: '1',
          amount: 200.00,
          interest: 5.0,
          reason: 'Small business expansion',
          status: 'PENDING',
          dueDate: null,
          createdAt: '2025-01-18T09:00:00Z'
        },
        {
          id: '2',
          amount: 100.00,
          interest: 5.0,
          reason: 'Emergency medical expenses',
          status: 'DISBURSED',
          dueDate: '2025-02-15T00:00:00Z',
          createdAt: '2025-01-10T11:00:00Z'
        }
      ])

      setCards([
        {
          id: '1',
          maskedPan: '4532 **** **** 1234',
          balance: 150.00,
          currency: 'USD',
          status: 'ACTIVE'
        }
      ])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const totalSavings = savings.reduce((sum, saving) => sum + saving.amount, 0)
  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const totalCardBalance = cards.reduce((sum, card) => sum + card.balance, 0)

  const formatCurrency = (amount: number, currency = 'USDT') => {
    return `${amount.toFixed(2)} ${currency}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'ACTIVE':
      case 'DISBURSED':
        return 'text-green-600 bg-green-100'
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100'
      case 'REJECTED':
      case 'BLOCKED':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            {/* Mobile sidebar content */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Banknote className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">Village SACCO</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <a href="#" className="bg-primary-500 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <TrendingUp className="mr-4 h-6 w-6" />
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <PiggyBank className="mr-4 h-6 w-6" />
                  Savings
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Banknote className="mr-4 h-6 w-6" />
                  Loans
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <CreditCard className="mr-4 h-6 w-6" />
                  Virtual Cards
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Send className="mr-4 h-6 w-6" />
                  Transfers
                </a>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <Banknote className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">Village SACCO</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <a href="#" className="bg-primary-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <TrendingUp className="mr-3 h-5 w-5" />
                Dashboard
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <PiggyBank className="mr-3 h-5 w-5" />
                Savings
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <Banknote className="mr-3 h-5 w-5" />
                Loans
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <CreditCard className="mr-3 h-5 w-5" />
                Virtual Cards
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <Send className="mr-3 h-5 w-5" />
                Transfers
              </a>
            </nav>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Welcome message */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Here&apos;s what&apos;s happening with your account today.
                </p>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <PiggyBank className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Savings</dt>
                          <dd className="text-lg font-medium text-gray-900">{formatCurrency(totalSavings)}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Banknote className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Active Loans</dt>
                          <dd className="text-lg font-medium text-gray-900">{formatCurrency(totalLoans)}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Card Balance</dt>
                          <dd className="text-lg font-medium text-gray-900">{formatCurrency(totalCardBalance, 'USD')}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Net Worth</dt>
                          <dd className="text-lg font-medium text-gray-900">{formatCurrency(totalSavings + totalCardBalance - totalLoans)}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-green-50 transition-colors">
                      <Plus className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Add Savings</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-green-50 transition-colors">
                      <Banknote className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Apply for Loan</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-green-50 transition-colors">
                      <CreditCard className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Request Card</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-green-50 transition-colors">
                      <Send className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Send Transfer</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <PiggyBank className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">Savings deposit completed</p>
                        <p className="text-xs text-gray-500">250 USDT • 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Banknote className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">Loan application submitted</p>
                        <p className="text-xs text-gray-500">200 USDT • 5 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CreditCard className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">Virtual card funded</p>
                        <p className="text-xs text-gray-500">150 USD • 1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent transactions */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
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
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {savings.map((saving) => (
                        <tr key={saving.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <PiggyBank className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm text-gray-900">Savings Deposit</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(saving.amount, saving.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(saving.status)}`}>
                              {saving.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(saving.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-500 hover:text-primary-600">
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {loans.map((loan) => (
                        <tr key={loan.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Banknote className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-sm text-gray-900">Loan</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(loan.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                              {loan.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(loan.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-500 hover:text-primary-600">
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
