import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { DollarSign, Shield, Check, HelpCircle } from 'lucide-react';
import { propertyOptions, liabilityOptions } from '../data/coverages';
import { useCartStore, type Coverage } from '../store/cart';

export const CoveragePage: React.FC = () => {
  const navigate = useNavigate();
  const { items, addItem, removeItem } = useCartStore();
  const [selectedTab, setSelectedTab] = useState<'property' | 'liability'>('property');
  
  const handleSelectCoverage = (coverage: Coverage) => {
    // Check if already in cart
    const existingItem = items.find(item => item.id === coverage.id);
    
    if (existingItem) {
      // If the same coverage is clicked, remove it
      removeItem(coverage.id);
    } else {
      // Otherwise add it to cart
      addItem(coverage);
    }
  };
  
  const isCoverageSelected = (id: string, levelId: string) => {
    return items.some(item => item.id === id && item.amount === 
      (selectedTab === 'property' 
        ? propertyOptions.find(o => o.id === id)?.levels.find(l => l.id === levelId)?.amount
        : liabilityOptions.find(o => o.id === id)?.levels.find(l => l.id === levelId)?.amount)
    );
  };
  
  const handleProceedToCheckout = () => {
    navigate('/premium');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold leading-6 text-gray-900">Select Your Coverage</h1>
        <p className="mt-2 text-sm text-gray-500">
          Choose the protection options that best fit your needs
        </p>
      </div>
      
      {/* Selected items summary */}
      {items.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-blue-900">Selected coverages: {items.length}</h3>
              <p className="text-xs text-blue-700 mt-1">
                Total premium: ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}/year
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleProceedToCheckout}
            >
              Continue to Premium
            </Button>
          </div>
        </div>
      )}
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('property')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${selectedTab === 'property'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Property Coverage
          </button>
          <button
            onClick={() => setSelectedTab('liability')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${selectedTab === 'liability'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Liability Coverage
          </button>
        </nav>
      </div>
      
      {/* Coverage options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(selectedTab === 'property' ? propertyOptions : liabilityOptions).map((option) => (
          <Card key={option.id} className="h-full">
            <CardHeader>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-900" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">{option.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {option.levels.map((level) => (
                  <div
                    key={level.id}
                    onClick={() => handleSelectCoverage({
                      id: option.id,
                      type: option.type,
                      name: option.name,
                      description: option.description,
                      amount: level.amount,
                      deductible: level.deductible,
                      price: level.price
                    })}
                    className={`
                      relative rounded-lg border p-4 cursor-pointer flex items-center justify-between
                      transition-all duration-200
                      ${isCoverageSelected(option.id, level.id)
                        ? 'border-blue-900 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}
                    `}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        ${level.amount.toLocaleString()}
                      </p>
                      {level.deductible > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          ${level.deductible.toLocaleString()} deductible
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900 mr-3">
                        ${level.price}/yr
                      </p>
                      {isCoverageSelected(option.id, level.id) ? (
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-900 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 h-5 w-5 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter>
              <button className="flex items-center text-sm text-blue-900 hover:text-blue-700">
                <HelpCircle className="h-4 w-4 mr-1" />
                Learn more about this coverage
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
        
        <Button
          variant="primary"
          onClick={handleProceedToCheckout}
          disabled={items.length === 0}
        >
          Continue to Premium
        </Button>
      </div>
    </div>
  );
};