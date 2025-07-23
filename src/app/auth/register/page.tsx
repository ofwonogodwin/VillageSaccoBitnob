'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Banknote, Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'member' as 'member' | 'admin'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    role: formData.role,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/auth/login?message=Registration successful! Please login.');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-[#00BB77]/20 relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#00BB77]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#00BB77]/15 rounded-full blur-3xl translate-y-1/2"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-transparent to-emerald-100/30"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center space-x-2 text-[#00BB77] hover:text-[#00995F] transition-colors mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Banknote className="h-10 w-10 text-[#00BB77]" />
                        <h1 className="text-3xl font-bold text-gray-900">Village SACCO</h1>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                    <p className="text-gray-600">Join the financial revolution in rural communities</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#00BB77]/20 ring-1 ring-white/50">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#00BB77] rounded-lg focus:ring-2 focus:ring-[#00BB77] focus:border-[#00BB77] text-gray-900 placeholder-gray-500"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#00BB77] rounded-lg focus:ring-2 focus:ring-[#00BB77] focus:border-[#00BB77] text-gray-900 placeholder-gray-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#00BB77] rounded-lg focus:ring-2 focus:ring-[#00BB77] focus:border-[#00BB77] text-gray-900 placeholder-gray-500"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                Account Type
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#00BB77] rounded-lg focus:ring-2 focus:ring-[#00BB77] focus:border-[#00BB77] text-gray-900"
                            >
                                <option value="member">Member</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 border border-[#00BB77] rounded-lg focus:ring-2 focus:ring-[#00BB77] focus:border-[#00BB77] text-gray-900 placeholder-gray-500"
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 border border-[#00BB77] rounded-lg focus:ring-2 focus:ring-[#00BB77] focus:border-[#00BB77] text-gray-900 placeholder-gray-500"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#00BB77] hover:bg-[#00995F] disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <UserPlus className="h-5 w-5" />
                                    <span>Create Account</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="text-[#00BB77] hover:text-[#00995F] font-semibold">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Info */}
                <div className="bg-[#00BB77]/10 backdrop-blur-sm border border-[#00BB77]/30 rounded-lg p-4 text-center">
                    <h3 className="font-semibold text-[#00BB77] mb-2">Demo Accounts Available</h3>
                    <div className="text-sm text-[#00995F] space-y-1">
                        <div><strong>Member:</strong> member@villagesacco.com / member123</div>
                        <div><strong>Admin:</strong> admin@villagesacco.com / admin123</div>
                    </div>
                </div>
            </div>
        </div>
    );
}