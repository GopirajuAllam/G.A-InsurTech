import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cart';

export const Premium: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, getSubtotal, getTax, getTotal } = useCartStore();
  
  // If cart is empty, redirect to coverage page
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/coverage');
    }
  }, [items, navigate]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold leading-6 text-gray-900">Your Premium Summary</h1>
        <p className="mt-2 text-sm text-gray-500">
          Review your selected coverages and total premium
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Selected Coverages</h2>
            </CardHeader>
            
            <CardContent>
              {items.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                          <div className="mt-2 flex items-center">
                            <ShieldCheck className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-xs text-gray-700">
                              Coverage: {formatCurrency(item.amount)}
                              {item.deductible > 0 && ` (${formatCurrency(item.deductible)} deductible)`}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.price)}/yr
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 text-xs text-red-600 hover:text-red-800 flex items-center"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">No coverages selected</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => navigate('/coverage')}
                  >
                    Add Coverage
                  </Button>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/coverage')}
              >
                Modify Coverages
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Premium Summary</h2>
            </CardHeader>
            
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">{formatCurrency(getSubtotal())}</dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Tax (7%)</dt>
                  <dd className="text-sm font-medium text-gray-900">{formatCurrency(getTax())}</dd>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <dt className="text-base font-medium text-gray-900">Annual Premium</dt>
                  <dd className="text-base font-medium text-blue-900">{formatCurrency(getTotal())}</dd>
                </div>
                
                <div className="text-xs text-gray-500">
                  <p>Premium is calculated based on your selected coverages and may be adjusted based on underwriting.</p>
                </div>
                
                <div className="text-sm text-gray-700">
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                    <span>Your policy is backed by our 100% satisfaction guarantee</span>
                  </div>
                </div>
              </dl>
            </CardContent>
            
            <CardFooter>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/payment')}
                className="flex items-center justify-center"
              >
                Proceed to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardContent className="py-4">
                <h3 className="text-sm font-medium text-gray-900">Questions?</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Our customer service team is available to help you with any questions you may have.
                </p>
                <p className="mt-2 text-sm text-blue-900">1-800-555-7890</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};