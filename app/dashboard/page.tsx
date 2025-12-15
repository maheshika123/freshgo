export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to FreshGo Dashboard
          </h2>
          <p className="text-gray-600 mb-8">
            You have successfully logged in!
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Account
            </h3>
            <p className="text-gray-600">
              This is your dashboard. You can manage your orders, profile, and preferences here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

