import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { PlusCircle, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

// Mock claims data - this would come from the database in a real app
const mockClaims = [
  { 
    id: '1',
    claimNumber: 'CLM-28475', 
    date: new Date(2024, 8, 10), 
    description: 'Water damage from burst pipe',
    status: 'Approved',
    amount: '$3,200',
    documents: ['Insurance_Report.pdf', 'Damage_Photos.zip']
  },
  { 
    id: '2',
    claimNumber: 'CLM-31942', 
    date: new Date(2024, 5, 22), 
    description: 'Wind damage to roof',
    status: 'Processing',
    amount: '$5,750',
    documents: ['Contractor_Estimate.pdf', 'Roof_Photos.jpg']
  },
  { 
    id: '3',
    claimNumber: 'CLM-29103', 
    date: new Date(2024, 2, 15), 
    description: 'Theft of personal property',
    status: 'Denied',
    amount: '$1,800',
    documents: ['Police_Report.pdf']
  }
];

export const Claims: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Denied':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Denied':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-gray-200 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold leading-6 text-gray-900">Claims History</h1>
            <p className="mt-2 text-sm text-gray-500">
              View and manage your insurance claims
            </p>
          </div>
          <Button
            variant="primary"
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            File New Claim
          </Button>
        </div>
      </div>
      
      {mockClaims.length > 0 ? (
        <div className="space-y-6">
          {mockClaims.map((claim) => (
            <Card key={claim.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium text-gray-900">{claim.claimNumber}</h2>
                    <span className={`ml-4 px-2 py-1 text-xs rounded-full ${getStatusClass(claim.status)}`}>
                      {claim.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Filed on {format(claim.date, 'MMM d, yyyy')}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-900">Claim Details</h3>
                    <p className="mt-1 text-sm text-gray-600">{claim.description}</p>
                    
                    {claim.documents.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-medium text-gray-700">Documents</h4>
                        <ul className="mt-2 space-y-1">
                          {claim.documents.map((doc, idx) => (
                            <li key={idx} className="text-xs text-blue-600 hover:underline cursor-pointer">
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Claim Amount</h3>
                      <p className="text-lg font-semibold text-gray-900">{claim.amount}</p>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      {getStatusIcon(claim.status)}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Status: {claim.status}</p>
                        <p className="text-xs text-gray-500">Last updated: {format(new Date(), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Claims Filed</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't filed any claims yet. If you need to report damage or loss, click the button below.
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                className="mx-auto"
              >
                File New Claim
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Need to File a Claim?</h2>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-gray-600">
              Our claims process is quick and easy. We're here to help you get back on your feet as soon as possible.
            </p>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-xl font-bold text-blue-900">1</span>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Report Your Claim</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Fill out the claim form with all relevant details about the incident.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-xl font-bold text-blue-900">2</span>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Assessment</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Our claims adjuster will review your claim and may schedule an inspection.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-xl font-bold text-blue-900">3</span>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Resolution</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Once approved, you'll receive payment for your covered damages.
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <div className="w-full bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-900 font-medium">Claims Hotline: 1-888-555-1234</p>
              <p className="text-xs text-gray-500">Available 24/7 for emergency claims</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};