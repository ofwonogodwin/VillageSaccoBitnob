'use client'

import Link from 'next/link'
import { Banknote, Users, CreditCard, Send, Shield, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Banknote className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-gray-900">Village SACCO</span>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/auth/login" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Digital Banking for
            <span className="block text-green-200">Rural Communities</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Access modern financial services including USDT savings, loans, virtual cards, 
            and international transfers - all designed for village communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              Get Started Today
            </Link>
            <Link 
              href="/demo" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-500 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete SACCO Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything your community needs for modern financial management, powered by blockchain technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary-500/10 p-3 rounded-lg">
                  <Banknote className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">USDT Savings</h3>
              </div>
              <p className="text-gray-600">
                Save in stable USDT currency with secure blockchain technology. 
                Track your savings growth and earn returns.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary-500/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">Community Loans</h3>
              </div>
              <p className="text-gray-600">
                Apply for loans with flexible terms. Quick approval process 
                with disbursement via wallet or virtual card.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary-500/10 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">Virtual Cards</h3>
              </div>
              <p className="text-gray-600">
                Get virtual debit cards for online purchases and ATM withdrawals. 
                Fund directly from your SACCO account.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary-500/10 p-3 rounded-lg">
                  <Send className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">International Transfers</h3>
              </div>
              <p className="text-gray-600">
                Send money globally using USDT. Low fees, fast transactions, 
                and real-time tracking for all transfers.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary-500/10 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">Secure & Reliable</h3>
              </div>
              <p className="text-gray-600">
                Bank-level security with blockchain transparency. 
                Your funds are protected with industry-standard encryption.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary-500/10 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">Mobile-First</h3>
              </div>
              <p className="text-gray-600">
                Optimized for mobile devices with offline capabilities. 
                Access your account anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Community&apos;s Finance?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of communities already using Village SACCO for their financial needs.
          </p>
          <Link 
            href="/auth/register" 
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
          >
            Start Your SACCO Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Banknote className="h-8 w-8 text-primary-500" />
                <span className="text-2xl font-bold text-gray-900">Village SACCO</span>
              </div>
              <p className="text-gray-600 mb-4">
                Empowering rural communities with modern digital financial services 
                through blockchain technology and innovative SACCO solutions.
              </p>
              <p className="text-sm text-gray-500">
                Built for Bitnob + Tether Hackathon 2025
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li>USDT Savings</li>
                <li>Community Loans</li>
                <li>Virtual Cards</li>
                <li>International Transfers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Security</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-gray-500">
            <p>&copy; 2025 Village SACCO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
