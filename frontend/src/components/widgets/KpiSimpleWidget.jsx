// frontend/src/components/widgets/KpiSimpleWidget.jsx
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { api } from '../../lib/api';
import { formatValue, formatPercent } from '../../utils/helpers';

/**
 * KPI Simple Widget - Displays a single key performance indicator
 * 
 * Shows:
 * - Label (e.g., "Sales Today")
 * - Large value (e.g., ₹152,300)
 * - Delta/change indicator (e.g., +12% vs previous period)
 */

export default function KpiSimpleWidget({ config }) {
  const { metric, precision = 0 } = config;
  
  // Fetch KPI data from API
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['kpi', metric],
    queryFn: () => api.getKPI(metric),
    refetchInterval: 60000, // Refresh every minute
  });
  
  // Loading state
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-red-200">
        <div className="text-center p-4">
          <p className="text-red-600 font-medium mb-2">Failed to load KPI</p>
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
  if (!data) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  // Determine if trend is positive or negative
  const isPositive = data.delta >= 0;
  const deltaColor = isPositive ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      {/* Label */}
      <div className="text-sm font-medium text-gray-600 mb-2">
        {data.label}
      </div>
      
      {/* Main Value */}
      <div className="text-3xl font-bold text-gray-900 mb-3">
        {formatValue(data.value, data.unit, precision)}
      </div>
      
      {/* Delta/Change */}
      <div className={`flex items-center gap-1 text-sm font-medium ${deltaColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span>{formatPercent(data.delta)} vs previous</span>
      </div>
    </div>
  );
}