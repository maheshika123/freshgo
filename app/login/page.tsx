'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Registration successful! Please sign in with your credentials.');
    }
  }, [searchParams]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
        setIsSubmitting(false);
        return;
      }

      // Success - redirect to home
      router.push('/');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 relative z-30">
        <h1 className="text-xl font-semibold">Login</h1>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left Panel - Promotional with Background Image */}
        <div 
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`,
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-amber-800/70 to-amber-900/80 z-10"></div>
          <div className="relative z-20 flex flex-col justify-center items-start p-12 text-white">
            <div className="space-y-4 mb-8">
              <h2 className="text-5xl font-bold leading-tight drop-shadow-lg">
                Welcome Back
                <br />
                to FreshGo
              </h2>
              <div className="text-4xl drop-shadow-lg">🍞</div>
            </div>
            <p className="text-lg text-white/95 max-w-md drop-shadow-md">
              Sign in to continue ordering your favorite treats.
            </p>
          </div>
        </div>

        {/* Right Panel - Login Form as Pop-up */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative min-h-[calc(100vh-73px)]">
          {/* Background pattern for glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-gray-100/50 to-amber-50/30"></div>
          
          {/* Pop-up Form Container with Glass-morphism */}
          <div className="w-full max-w-md relative z-10 rounded-2xl p-8 sm:p-10 lg:p-12 transform transition-all duration-300 ease-out
            bg-white/85 backdrop-blur-xl
            border border-white/40
            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
            before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-white/50 before:to-transparent before:-z-10
            after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-white/20 after:via-transparent after:to-transparent after:pointer-events-none">
            {/* Decorative top accent with glass effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/80 via-amber-400/60 to-amber-500/80 rounded-t-2xl backdrop-blur-sm"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="mb-8 relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 drop-shadow-sm">
                Sign In
              </h2>
              <p className="text-gray-700 drop-shadow-sm">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {successMessage && (
                <div className="bg-green-50/90 backdrop-blur-sm border border-green-200/50 text-green-700 px-4 py-3 rounded-lg shadow-sm">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="bg-red-50/90 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                  {error}
                </div>
              )}

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-900 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-600 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-900 font-medium">
                    Remember me
                  </label>
                </div>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm border border-amber-600/30"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-700">
                  Don't have an account?{' '}
                  <Link 
                    href="/register" 
                    className="text-amber-700 hover:text-amber-800 font-semibold hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

