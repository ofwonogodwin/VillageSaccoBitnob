'use client';

import Link from 'next/link';
import { Banknote, Users, CreditCard, Send, Shield, Globe, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-[#00BB77]/10">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Banknote className="h-8 w-8 text-[#00BB77]" />
              <span className="text-2xl font-bold text-gray-900">Village SACCO</span>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="bg-[#00BB77] hover:bg-[#00995F] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Professional Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/40 to-[#00BB77]/15"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-green-100/30"></div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300BB77' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#00BB77]/10 text-[#00BB77] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#00BB77]/20">
                <CheckCircle className="h-4 w-4" />
                <span>Trusted by 500+ Communities</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Modern Financial
                <span className="block text-[#00BB77]">Services for</span>
                <span className="block text-gray-700">Rural Communities</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empower your community with blockchain-powered SACCO services.
                Secure savings, instant loans, virtual cards, and global transfers
                designed specifically for village economies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/auth/register"
                  className="bg-[#00BB77] hover:bg-[#00995F] text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Start Your SACCO</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#demo"
                  className="border-2 border-[#00BB77] text-[#00BB77] hover:bg-[#00BB77] hover:text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-200 flex items-center justify-center"
                >
                  Try Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00BB77] mb-1">$2M+</div>
                  <div className="text-sm text-gray-600">Funds Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00BB77] mb-1">10K+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00BB77] mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Content - Professional Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                {/* Mock Dashboard */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Dashboard Overview</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#00BB77]/10 to-emerald-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[#00BB77] p-2 rounded-lg">
                        <Banknote className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total Savings</div>
                        <div className="font-semibold text-gray-900">1,250.00 USDT</div>
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-[#00BB77]" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Virtual Card</div>
                        <div className="font-semibold text-gray-900">$450.00 USD</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500 p-2 rounded-lg">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Active Loans</div>
                        <div className="font-semibold text-gray-900">200.00 USDT</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-[#00BB77] text-white py-2 px-4 rounded-md text-sm font-medium">
                    Quick Transfer
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium">
                    View History
                  </button>
                </div>
              </div>

              {/* Demo Credentials Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#00BB77] text-white p-4 rounded-xl shadow-lg">
                <div className="text-xs font-medium mb-1">Demo Access</div>
                <div className="text-xs opacity-90">admin@villagesacco.com</div>
                <div className="text-xs opacity-75">Password: admin123</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete SACCO Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your community needs for modern financial management, powered by blockchain technology and integrated with global payment systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-[#00BB77] to-[#00995F] p-3 rounded-xl">
                  <Banknote className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">USDT Savings</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Save in stable USDT currency with secure blockchain technology.
                Earn competitive returns while protecting against inflation.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Community Loans</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Apply for loans with flexible terms and competitive rates.
                Quick approval process with instant disbursement.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Virtual Cards</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Get virtual debit cards for online purchases and ATM withdrawals.
                Fund directly from your SACCO account instantly.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Global Transfers</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Send money globally using USDT with minimal fees.
                Fast transactions with real-time tracking and confirmation.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Bank-Level Security</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Military-grade encryption with blockchain transparency.
                Your funds are protected with multi-layer security protocols.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-3 rounded-xl">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Mobile-First Design</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Optimized for mobile devices with offline capabilities.
                Access your account anywhere, anytime with seamless UX.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-r from-[#00BB77]/5 to-emerald-50/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Try Our Demo
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the full SACCO platform with our interactive demo.
              No registration required - just login and explore all features.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Member Dashboard</h4>
                <p className="text-sm text-gray-600 mb-4">Experience the member interface</p>
                <div className="text-sm text-left space-y-1">
                  <div><strong>Email:</strong> member@villagesacco.com</div>
                  <div><strong>Password:</strong> member123</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Admin Dashboard</h4>
                <p className="text-sm text-gray-600 mb-4">Explore administrative features</p>
                <div className="text-sm text-left space-y-1">
                  <div><strong>Email:</strong> admin@villagesacco.com</div>
                  <div><strong>Password:</strong> admin123</div>
                </div>
              </div>
            </div>

            <Link
              href="/auth/login"
              className="bg-[#00BB77] hover:bg-[#00995F] text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Access Demo</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#00BB77] to-[#008855] text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Community&apos;s Finance?
          </h2>
          <p className="text-xl mb-8 text-green-100 leading-relaxed">
            Join thousands of communities already using Village SACCO for their financial needs.
            Start building a stronger, more connected financial future today.
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-[#00BB77] hover:bg-gray-100 px-8 py-4 rounded-md font-bold text-lg transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Start Your SACCO Today</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Banknote className="h-8 w-8 text-[#00BB77]" />
                <span className="text-2xl font-bold">Village SACCO</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering rural communities with modern digital financial services
                through blockchain technology and innovative SACCO solutions.
              </p>
              <p className="text-sm text-gray-500">
                Built for Bitnob + Tether Hackathon 2025
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">USDT Savings</li>
                <li className="hover:text-white transition-colors cursor-pointer">Community Loans</li>
                <li className="hover:text-white transition-colors cursor-pointer">Virtual Cards</li>
                <li className="hover:text-white transition-colors cursor-pointer">Global Transfers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Security</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
            <p>&copy; 2025 Village SACCO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
