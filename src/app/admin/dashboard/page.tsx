'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Banknote, 
  PiggyBank, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Check,
  X,
  LogOut,
  Menu,
  Shield
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

interface Member {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  isActive: boolean
  createdAt: string
  totalSavings: number
  totalLoans: number
}

interface Loan {
  id: string
  userId: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
  amount: number
  interest: number
  reason: string
  status: string
  createdAt: string
}

interface VirtualCardRequest {
  id: string
  userId: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [pendingLoans, setPendingLoans] = useState<Loan[]>([])
  const [cardRequests, setCardRequests] = useState<VirtualCardRequest[]>([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalSavings: 0,
    totalLoans: 0,
    pendingApprovals: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    // Fetch admin dashboard data
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setIsLoading(true)
      
      // Mock data for demo
      setMembers([
        {
          id: '1',
          email: 'member@villagesacco.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+256 700 000 002',
          isActive: true,
          createdAt: '2025-01-15T10:00:00Z',
          totalSavings: 750.00,
          totalLoans: 300.00
        },
        {
          id: '2',
          email: 'jane@villagesacco.com',
          firstName: 'Jane',
          lastName: 'Smith',
          phone: '+256 700 000 003',
          isActive: true,
          createdAt: '2025-01-10T14:30:00Z',
          totalSavings: 1300.00,
          totalLoans: 500.00
        },
        {
          id: '3',
          email: 'peter@villagesacco.com',
          firstName: 'Peter',
          lastName: 'Mukasa',
          phone: '+256 700 000 004',
          isActive: false,
          createdAt: '2025-01-20T09:00:00Z',
          totalSavings: 0,
          totalLoans: 0
        }
      ])

      setPendingLoans([
        {
          id: '1',
          userId: '1',
          user: { firstName: 'John', lastName: 'Doe', email: 'member@villagesacco.com' },
          amount: 200.00,
          interest: 5.0,
          reason: 'Small business expansion',
          status: 'PENDING',
          createdAt: '2025-01-18T09:00:00Z'
        },
        {
          id: '2',
          userId: '2',
          user: { firstName: 'Jane', lastName: 'Smith', email: 'jane@villagesacco.com' },
          amount: 500.00,
          interest: 5.0,
          reason: 'Agriculture equipment purchase',
          status: 'PENDING',
          createdAt: '2025-01-19T11:30:00Z'
        }
      ])

      setCardRequests([
        {
          id: '1',
          userId: '2',
          user: { firstName: 'Jane', lastName: 'Smith', email: 'jane@villagesacco.com' },
          status: 'PENDING',
          createdAt: '2025-01-20T15:00:00Z'
        }
      ])

      setStats({
        totalMembers: 4,
        activeMembers: 3,
        totalSavings: 2050.00,
        totalLoans: 800.00,
        pendingApprovals: 4
      })

    } catch (error) {
      console.error('Error fetching admin data:', error)
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

  const approveMember = async (memberId: string) => {
    // API call would go here
    console.log('Approving member:', memberId)
    
    // Update local state for demo
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, isActive: true } : member
    ))
  }

  const approveLoan = async (loanId: string) => {
    // API call would go here
    console.log('Approving loan:', loanId)
    
    // Update local state for demo
    setPendingLoans(prev => prev.filter(loan => loan.id !== loanId))
  }

  const rejectLoan = async (loanId: string) => {
    // API call would go here
    console.log('Rejecting loan:', loanId)
    
    // Update local state for demo
    setPendingLoans(prev => prev.filter(loan => loan.id !== loanId))
  }

  const approveCard = async (cardId: string) => {
    // API call would go here
    console.log('Approving card:', cardId)
    
    // Update local state for demo
    setCardRequests(prev => prev.filter(card => card.id !== cardId))
  }

  const formatCurrency = (amount: number, currency = 'USDT') => {
    return `${amount.toFixed(2)} ${currency}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
                <Shield className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <a href="#" className="bg-primary-500 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <TrendingUp className="mr-4 h-6 w-6" />
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Users className="mr-4 h-6 w-6" />
                  Members
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
                  <PiggyBank className="mr-4 h-6 w-6" />
                  Savings
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <Shield className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <a href="#" className="bg-primary-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <TrendingUp className="mr-3 h-5 w-5" />
                Dashboard
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <Users className="mr-3 h-5 w-5" />
                Members
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
                <PiggyBank className="mr-3 h-5 w-5" />
                Savings
              </a>
            </nav>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
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
                  Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your Village SACCO operations and member activities.
                </p>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Members</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.totalMembers}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Active Members</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.activeMembers}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <PiggyBank className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Savings</dt>
                          <dd className="text-lg font-medium text-gray-900">{formatCurrency(stats.totalSavings)}</dd>
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
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Loans</dt>
                          <dd className="text-lg font-medium text-gray-900">{formatCurrency(stats.totalLoans)}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.pendingApprovals}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending approvals sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Pending loan approvals */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                      Pending Loan Approvals ({pendingLoans.length})
                    </h3>
                  </div>
                  <div className="p-6">
                    {pendingLoans.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No pending loan applications</p>
                    ) : (
                      <div className="space-y-4">
                        {pendingLoans.map((loan) => (
                          <div key={loan.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {loan.user.firstName} {loan.user.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{loan.user.email}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">{formatCurrency(loan.amount)}</p>
                                <p className="text-sm text-gray-500">{loan.interest}% interest</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-3">{loan.reason}</p>
                            <p className="text-xs text-gray-500 mb-3">Applied: {formatDate(loan.createdAt)}</p>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveLoan(loan.id)}
                                className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => rejectLoan(loan.id)}
                                className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </button>
                              <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pending card requests */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                      Pending Card Requests ({cardRequests.length})
                    </h3>
                  </div>
                  <div className="p-6">
                    {cardRequests.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No pending card requests</p>
                    ) : (
                      <div className="space-y-4">
                        {cardRequests.map((card) => (
                          <div key={card.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {card.user.firstName} {card.user.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{card.user.email}</p>
                              </div>
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-600">
                                {card.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">Requested: {formatDate(card.createdAt)}</p>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveCard(card.id)}
                                className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve & Create
                              </button>
                              <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Profile
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Member management */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Member Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Savings
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Loans
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {members.map((member) => (
                        <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {member.firstName} {member.lastName}
                              </p>
                              <p className="text-sm text-gray-500">{member.email}</p>
                              <p className="text-sm text-gray-500">{member.phone}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              member.isActive 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {member.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(member.totalSavings)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(member.totalLoans)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(member.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              {!member.isActive && (
                                <button
                                  onClick={() => approveMember(member.id)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                              )}
                              <button className="text-primary-500 hover:text-primary-600">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
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
