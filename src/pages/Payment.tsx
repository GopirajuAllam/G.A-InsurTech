import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CreditCard, CheckSquare, Lock } from 'lucide-react';
import { useCartStore } from '../store/cart';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { getTotal, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit'>('credit');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [formErrors, setFormErrors] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    // Card number validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
      valid = false;
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
      valid = false;
    }
    
    // Cardholder name validation
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
      valid = false;
    }
    
    // Expiry date validation
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
      valid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format must be MM/YY';
      valid = false;
    }
    
    // CVV validation
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
      valid = false;
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
      valid = false;
    }
    
    // Billing address validation
    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
      valid = false;
    }
    
    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }
    
    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    }
    
    // ZIP code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      valid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code format';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      clearCart();
      navigate('/payment-success');
    }, 2000);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold leading-6 text-gray-900">Payment Information</h1>
        <p className="mt-2 text-sm text-gray-500">
          Securely process your payment to activate your insurance policy
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit')}
                  className={`
                    flex-1 flex items-center justify-center py-2 border rounded-md
                    ${paymentMethod === 'credit' 
                      ? 'border-blue-900 bg-blue-50 text-blue-900' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Credit Card
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('debit')}
                  className={`
                    flex-1 flex items-center justify-center py-2 border rounded-md
                    ${paymentMethod === 'debit' 
                      ? 'border-blue-900 bg-blue-50 text-blue-900' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Debit Card
                </button>
              </div>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start mb-4">
                    <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                  
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    label="Card Number"
                    placeholder="•••• •••• •••• ••••"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    error={formErrors.cardNumber}
                    required
                  />
                  
                  <Input
                    id="cardName"
                    name="cardName"
                    label="Cardholder Name"
                    placeholder="As it appears on your card"
                    value={formData.cardName}
                    onChange={handleChange}
                    error={formErrors.cardName}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      error={formErrors.expiryDate}
                      required
                    />
                    
                    <Input
                      id="cvv"
                      name="cvv"
                      label="CVV"
                      placeholder="•••"
                      value={formData.cvv}
                      onChange={handleChange}
                      error={formErrors.cvv}
                      required
                    />
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Billing Address</h3>
                    
                    <Input
                      id="billingAddress"
                      name="billingAddress"
                      label="Street Address"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      error={formErrors.billingAddress}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        id="city"
                        name="city"
                        label="City"
                        value={formData.city}
                        onChange={handleChange}
                        error={formErrors.city}
                        required
                      />
                      
                      <Input
                        id="state"
                        name="state"
                        label="State"
                        value={formData.state}
                        onChange={handleChange}
                        error={formErrors.state}
                        required
                      />
                    </div>
                    
                    <Input
                      id="zipCode"
                      name="zipCode"
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      error={formErrors.zipCode}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/premium')}
                  >
                    Back to Premium
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                  >
                    Complete Payment
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Premium</span>
                  <span className="font-medium">{formatCurrency(getTotal())}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-blue-900">{formatCurrency(getTotal())}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Billed annually. You can cancel or change your policy at any time.
                  </p>
                </div>
                
                <div className="pt-4 flex flex-col space-y-2">
                  <div className="flex items-start">
                    <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Your policy will be activated immediately after payment</span>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">You will receive policy documents via email</span>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">24/7 claims support included</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-gray-600 mr-2" />
                  <p className="text-sm text-gray-600">
                    Secure payment processing with SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};