import { useEffect, useState } from 'react';
import { useCustomerPolicyStore } from '../store/customer-policy';

export function CustomerPolicyPage() {
  const { customers, policies, loading, error, fetchCustomers, fetchPolicies } = useCustomerPolicyStore();
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  useEffect(() => {
    fetchCustomers();
    fetchPolicies();
  }, [fetchCustomers, fetchPolicies]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer and Policy Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customers Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Customers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t">
                    <td className="px-4 py-2">{`${customer.firstName} ${customer.lastName}`}</td>
                    <td className="px-4 py-2">{customer.email}</td>
                    <td className="px-4 py-2">{customer.phone}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setSelectedCustomer(customer.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        View Policies
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policies Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Policies</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Policy Number</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Premium</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {policies
                  .filter((policy) => !selectedCustomer || policy.customerId === selectedCustomer)
                  .map((policy) => (
                    <tr key={policy.id} className="border-t">
                      <td className="px-4 py-2">{policy.policyNumber}</td>
                      <td className="px-4 py-2">{policy.policyType}</td>
                      <td className="px-4 py-2">${policy.premium}</td>
                      <td className="px-4 py-2">{policy.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 