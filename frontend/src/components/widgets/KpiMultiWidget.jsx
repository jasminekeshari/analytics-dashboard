// frontend/src/components/widgets/KpiMultiWidget.jsx
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { api } from '../../lib/api';
import { formatValue, formatPercent } from '../../utils/helpers';

/**
 * Multi-KPI Widget - Display multiple metrics in one card
 * 
 * Shows 2-3 KPIs side by side for quick comparison
 * Perfect for dashboard overview sections
 */

export default function KpiMultiWidget({ config }) {
  const { metrics = ['todaySales', 'ordersToday', 'convRate'] } = config;
  
  // Fetch multi-KPI data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['kpi-multi', metrics.join(',')],
    queryFn: () => api.getMultiKPI(metrics),
    refetchInterval: 60000,
  });
  
  // Loading state
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-500">Loading KPIs...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-red-200">
        <div className="text-center p-4">
          <p className="text-red-600 font-medium mb-2">Failed to load KPIs</p>
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
  if (!data?.items || data.items.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-full grid grid-cols-3 gap-4">
        {data.items.map((kpi, index) => {
          const isPositive = kpi.delta >= 0;
          const deltaColor = isPositive ? 'text-green-600' : 'text-red-600';
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          const bgColor = index === 0 ? 'bg-blue-50' : index === 1 ? 'bg-purple-50' : 'bg-green-50';
          
          return (
            <div 
              key={index} 
              className={`${bgColor} rounded-lg p-4 flex flex-col justify-between transition-all hover:shadow-md`}
            >
              {/* Label */}
              <div className="text-xs font-medium text-gray-600 mb-2">
                {kpi.label}
              </div>
              
              {/* Value */}
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {formatValue(kpi.value, kpi.unit, kpi.unit === '%' ? 1 : 0)}
              </div>
              
              {/* Delta */}
              <div className={`flex items-center gap-1 text-xs font-medium ${deltaColor}`}>
                <TrendIcon className="w-3 h-3" />
                <span>{formatPercent(kpi.delta)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}