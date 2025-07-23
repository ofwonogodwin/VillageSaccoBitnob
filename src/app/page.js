export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                    Village SACCO
                </h1>
                <p className="text-xl text-center text-gray-600 mb-12">
                    Modern Financial Services for Rural Communities
                </p>

                <div className="flex justify-center space-x-4">
                    <a
                        href="/auth/login"
                        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                    >
                        Login
                    </a>
                    <a
                        href="/auth/register"
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300"
                    >
                        Register
                    </a>
                </div>

                <div className="mt-16 bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Demo Credentials</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Admin Access</h3>
                            <p>Email: admin@villagesacco.com</p>
                            <p>Password: admin123</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Member Access</h3>
                            <p>Email: member@villagesacco.com</p>
                            <p>Password: member123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
