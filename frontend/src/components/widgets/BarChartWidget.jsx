// frontend/src/components/widgets/BarChartWidget.jsx
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { api } from '../../lib/api';
import { formatValue } from '../../utils/helpers';

/**
 * Bar Chart Widget - Compare values across categories
 * 
 * Perfect for:
 * - Top products by revenue
 * - Sales by region
 * - Any comparison across categories
 */

// Beautiful color palette
const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function BarChartWidget({ config }) {
  const { title, source, limit = 5 } = config;
  
  // Fetch categorical data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['categorical', source, limit],
    queryFn: () => api.getCategorical({ source, limit }),
    refetchInterval: 120000,
  });
  
  // Loading state
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-500">Loading chart...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-red-200">
        <div className="text-center p-4">
          <p className="text-red-600 font-medium mb-2">Failed to load chart</p>
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
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload[0]) return null;
    
    const item = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-700">{item.label}</p>
        <p className="text-lg font-bold text-blue-600">
          {formatValue(item.value, data.unit)}
        </p>
      </div>
    );
  };
  
  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Top {data.items.length} items</p>
      </div>
      
      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data.items} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value;
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          >
            {data.items.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}