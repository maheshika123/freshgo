'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    country: '',
    preferredContact: '',
    favoriteCategory: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms and Conditions');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Success - redirect to login page
      router.push('/login?registered=true');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 relative z-30">
        <h1 className="text-xl font-semibold">Register</h1>
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
                Freshly Baked
                <br />
                Happiness Every
                <br />
                Day
              </h2>
              <div className="text-4xl drop-shadow-lg">🍪</div>
            </div>
            <p className="text-lg text-white/95 max-w-md drop-shadow-md">
              Join us and order your favorite treats online.
            </p>
          </div>
        </div>

        {/* Right Panel - Registration Form as Pop-up */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative min-h-[calc(100vh-73px)]">
          {/* Background pattern for glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-gray-100/50 to-amber-50/30"></div>
          
          {/* Pop-up Form Container with Glass-morphism */}
          <div className="w-full max-w-2xl relative z-10 rounded-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-300 ease-out
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
                Create Your Account
              </h2>
              <p className="text-gray-700 drop-shadow-sm">
                Start ordering your favorites online
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {error && (
                <div className="bg-red-50/90 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-900 mb-2">
                  Username/Display name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-900 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-semibold text-gray-900 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
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
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Address Line 1 */}
              <div>
                <label htmlFor="addressLine1" className="block text-sm font-semibold text-gray-900 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  required
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <label htmlFor="addressLine2" className="block text-sm font-semibold text-gray-900 mb-2">
                  Address (Line 2)
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* ZIP Code and Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-900 mb-2">
                    ZIP / Post Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="NL">Netherlands</option>
                    <option value="BE">Belgium</option>
                    <option value="CH">Switzerland</option>
                    <option value="AT">Austria</option>
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                    <option value="DK">Denmark</option>
                    <option value="FI">Finland</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="IE">Ireland</option>
                    <option value="GR">Greece</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="HU">Hungary</option>
                    <option value="RO">Romania</option>
                    <option value="BG">Bulgaria</option>
                    <option value="HR">Croatia</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="EE">Estonia</option>
                    <option value="LV">Latvia</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MT">Malta</option>
                    <option value="CY">Cyprus</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label htmlFor="preferredContact" className="block text-sm font-semibold text-gray-900 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  required
                  value={formData.preferredContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="sms">SMS</option>
                </select>
              </div>

              {/* Favorite Product Category */}
              <div>
                <label htmlFor="favoriteCategory" className="block text-sm font-semibold text-gray-900 mb-2">
                  Favorite Product Category
                </label>
                <select
                  id="favoriteCategory"
                  name="favoriteCategory"
                  required
                  value={formData.favoriteCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-300/70 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-500 outline-none transition shadow-sm text-gray-900 placeholder:text-gray-500"
                >
                  <option value="">Select Category</option>
                  <option value="bread">Bread</option>
                  <option value="pastries">Pastries</option>
                  <option value="cakes">Cakes</option>
                  <option value="cookies">Cookies</option>
                  <option value="desserts">Desserts</option>
                  <option value="breakfast">Breakfast Items</option>
                </select>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-600 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-900 font-medium">
                  I Agree to the{' '}
                  <a href="/terms" className="text-amber-700 hover:text-amber-800 underline font-medium">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm border border-amber-600/30"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>

              {/* Sign In Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-700">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-amber-700 hover:text-amber-800 font-semibold hover:underline"
                  >
                    Sign in
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

