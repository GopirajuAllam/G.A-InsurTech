import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card, CardFooter } from '../components/Card';
import { useAuthStore } from '../store/auth';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, loading, error, clearError } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
    if (error) clearError();
  };

  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    try {
      await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-blue-900" />
        </div>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Step {step} of 2
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={step === 1 ? (e => { e.preventDefault(); handleNextStep(); }) : handleSubmit} className="space-y-6 p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                {error}
              </div>
            )}
            
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="First name"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={formErrors.firstName}
                    required
                  />

                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Last name"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={formErrors.lastName}
                    required
                  />
                </div>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  required
                />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  required
                />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={formErrors.confirmPassword}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Phone number"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={formErrors.phone}
                  required
                />

                <Input
                  id="address"
                  name="address"
                  type="text"
                  label="Street address"
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={handleChange}
                  error={formErrors.address}
                  required
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    label="City"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleChange}
                    error={formErrors.city}
                    required
                  />

                  <Input
                    id="state"
                    name="state"
                    type="text"
                    label="State"
                    autoComplete="address-level1"
                    value={formData.state}
                    onChange={handleChange}
                    error={formErrors.state}
                    required
                  />
                </div>

                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  label="ZIP code"
                  autoComplete="postal-code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  error={formErrors.zipCode}
                  required
                />

                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  label="Date of birth (optional)"
                  autoComplete="bday"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  error={formErrors.dateOfBirth}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={loading}
                  >
                    Create account
                  </Button>
                </div>
              </>
            )}
          </form>
          
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-900 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};