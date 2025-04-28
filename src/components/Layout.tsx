import React, { Suspense } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { Button } from './Button';
import { clsx } from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Don't show navigation on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Coverage', path: '/coverage' },
    { name: 'Claims', path: '/claims' },
  ];
  
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center py-6">
          <Link to="/" className="flex items-center text-blue-900">
            <Shield className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">G.A. InsurTech</span>
          </Link>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <main>{children}</main>
        </Suspense>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center text-blue-900">
                <Shield className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">G.A. InsurTech</span>
              </Link>
              <nav className="hidden sm:ml-10 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={clsx(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      location.pathname === link.path
                        ? 'border-blue-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-4">
                    {user.first_name} {user.last_name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign out
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="primary" size="sm">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                    location.pathname === link.path
                      ? 'bg-blue-50 border-blue-900 text-blue-900'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <div>
                  <div className="flex items-center px-4">
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2">
                  <Link
                    to="/login"
                    className="block text-center w-full px-4 py-2 text-base font-medium text-white bg-blue-900 rounded-md shadow-sm hover:bg-blue-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      <Suspense fallback={<LoadingSpinner />}>
        <main className="py-6 sm:py-8 lg:py-10">{children}</main>
      </Suspense>
      
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
            <div className="flex items-center space-x-1">
              <Shield className="h-5 w-5 text-blue-900" />
              <span className="text-blue-900 font-semibold">G.A. InsurTech</span>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} G.A. InsurTech. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};