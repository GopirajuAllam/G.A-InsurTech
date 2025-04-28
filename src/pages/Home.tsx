import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Shield, FileText, AlertTriangle, Clock, Home as HomeIcon, Car, Heart, Users } from 'lucide-react';
import { useAuthStore } from '../store/auth';

// Mock policy data - this would come from the database in a real app
const mockPolicy = {
  policyNumber: 'POL-39284756',
  effectiveDate: new Date(2025, 3, 15),
  expiryDate: new Date(2026, 3, 15),
  status: 'Active',
  coverages: [
    { name: 'Dwelling Coverage', amount: '$250,000', deductible: '$1,000' },
    { name: 'Personal Property', amount: '$100,000', deductible: '$500' },
    { name: 'Personal Liability', amount: '$300,000', deductible: '$0' },
  ],
  claims: [
    { 
      claimNumber: 'CLM-28475', 
      date: new Date(2024, 8, 10), 
      description: 'Water damage from burst pipe',
      status: 'Approved',
      amount: '$3,200'
    },
  ]
};

const features = [
  {
    name: 'Home Insurance',
    description: 'Comprehensive coverage for your home and personal belongings',
    icon: HomeIcon,
  },
  {
    name: 'Auto Insurance',
    description: 'Protection for your vehicles with flexible coverage options',
    icon: Car,
  },
  {
    name: 'Life Insurance',
    description: 'Secure your family\'s future with our life insurance plans',
    icon: Heart,
  },
  {
    name: 'Business Insurance',
    description: 'Protect your business with tailored insurance solutions',
    icon: Users,
  },
];

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  // If no user is logged in, show landing page
  if (!user) {
    return (
      <div className="bg-white">
        {/* Hero Section with animated background */}
        <div className="relative bg-blue-900 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Insurance background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 mix-blend-multiply"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center animate-fade-in">
              <Shield className="h-16 w-16 text-white mx-auto animate-bounce" />
              <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl animate-slide-up">
                Protection for what matters most
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 animate-slide-up delay-100">
                Comprehensive insurance solutions to protect your home, vehicles, and loved ones.
              </p>
              <div className="mt-10 flex justify-center space-x-4 animate-slide-up delay-200">
                <Link to="/signup">
                  <Button variant="primary" size="lg" className="transform hover:scale-105 transition-transform">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-transform">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section with hover effects */}
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl animate-fade-in">
                Our Insurance Solutions
              </h2>
              <p className="mt-4 text-lg text-gray-500 animate-fade-in delay-100">
                Choose from our range of insurance products designed to meet your needs
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.name} className="p-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
                  <div className="bg-blue-50 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section with parallax effect */}
        <div className="relative py-16 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Insurance office"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl animate-fade-in">
                Why Choose G.A. InsurTech?
              </h2>
              <p className="mt-4 text-lg text-gray-500 animate-fade-in delay-100">
                We're committed to providing the best insurance experience
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">24/7 Support</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Our team is always here to help you with any questions or claims
                </p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Claims</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Simple and fast claims process to get you back on track quickly
                </p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                  <AlertTriangle className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Risk Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Expert advice to help you minimize risks and protect your assets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // User is logged in, show dashboard with animations
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold leading-6 text-gray-900">Welcome back, {user.first_name}</h1>
        <p className="mt-2 text-sm text-gray-500">
          Your policies and protection at a glance
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="transform hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Your Policy</h2>
              <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 animate-pulse">
                {mockPolicy.status}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <dl className="divide-y divide-gray-200">
              <div className="grid grid-cols-2 gap-4 py-3">
                <dt className="text-sm font-medium text-gray-500">Policy Number</dt>
                <dd className="text-sm font-medium text-gray-900">{mockPolicy.policyNumber}</dd>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-3">
                <dt className="text-sm font-medium text-gray-500">Effective Date</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {format(mockPolicy.effectiveDate, 'MMM d, yyyy')}
                </dd>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-3">
                <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {format(mockPolicy.expiryDate, 'MMM d, yyyy')}
                </dd>
              </div>
            </dl>
            
            <div className="mt-5 border-t border-gray-200 pt-5">
              <h3 className="text-sm font-medium text-gray-900">Selected Coverages</h3>
              <ul className="mt-3 divide-y divide-gray-200">
                {mockPolicy.coverages.map((coverage, index) => (
                  <li key={index} className="py-3">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{coverage.name}</p>
                      <p className="text-sm text-gray-500">{coverage.amount}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Deductible: {coverage.deductible}</p>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          
          <CardFooter>
            <Link to="/coverage">
              <Button variant="outline" size="sm" className="w-full">
                Manage Coverages
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Claims</h2>
                <span className="text-sm text-gray-500">{mockPolicy.claims.length} total</span>
              </div>
            </CardHeader>
            
            {mockPolicy.claims.length > 0 ? (
              <CardContent>
                <ul className="divide-y divide-gray-200">
                  {mockPolicy.claims.map((claim, index) => (
                    <li key={index} className="py-3">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{claim.claimNumber}</p>
                        <div className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {claim.status}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{claim.description}</p>
                      <div className="flex justify-between mt-2">
                        <p className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {format(claim.date, 'MMM d, yyyy')}
                        </p>
                        <p className="text-sm font-medium text-gray-900">{claim.amount}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">You have no claims</p>
                </div>
              </CardContent>
            )}
            
            <CardFooter>
              <Link to="/claims">
                <Button variant="outline" size="sm" className="w-full">
                  View All Claims
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Need Help?</h2>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-500">
                Our customer service team is available 24/7 to assist you with any questions or concerns.
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Customer Service</p>
                <p className="text-sm text-gray-500">1-800-555-7890</p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Claims Hotline</p>
                <p className="text-sm text-gray-500">1-888-555-1234</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;