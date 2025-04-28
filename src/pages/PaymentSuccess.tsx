import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-16">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h1>
        
        <p className="mt-2 text-sm text-gray-600">
          Your insurance policy has been activated. You will receive your policy documents via email shortly.
        </p>
        
        <div className="mt-6 bg-blue-50 rounded-md p-4 text-left">
          <h3 className="text-sm font-medium text-blue-900">Policy Details</h3>
          <p className="mt-1 text-sm text-blue-800">
            Policy Number: POL-39284756
          </p>
          <p className="text-sm text-blue-800">
            Effective Date: April 15, 2025
          </p>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          You will be redirected to your dashboard in 5 seconds...
        </p>
        
        <div className="mt-6">
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/')}
          >
            Go to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};