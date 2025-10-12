// frontend/src/components/widgets/OrdersTableWidget.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../lib/api';
import { formatCurrency, formatDate } from '../../utils/helpers';

/**
 * Orders Table Widget - Display orders with pagination
 * 
 * Features:
 * - Sortable columns
 * - Filterable by status
 * - Pagination
 * - Status badges with colors
 */

export default function OrdersTableWidget({ config }) {
  const { title = 'Orders', status = 'all', pageSize = 10 } = config;
  const [page, setPage] = useState(1);
  
  // Fetch table data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['table', 'orders', page, status, pageSize],
    queryFn: () => api.getTableData({ 
      source: 'orders', 
      page, 
      size: pageSize,
      ...(status !== 'all' && { status })
    }),
    keepPreviousData: true, // Smooth pagination
  });
  
  // Loading state
  if (isLoading && !data) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-500">Loading table...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-red-200">
        <div className="text-center p-4">
          <p className="text-red-600 font-medium mb-2">Failed to load table</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (!data?.rows || data.rows.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };
  
  const totalPages = Math.ceil(data.total / pageSize);
  
  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{data.total} total orders</p>
      </div>
      
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {data.columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {row.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.customer}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  {formatCurrency(row.total, row.currency)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {formatDate(row.createdAt, 'short')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}