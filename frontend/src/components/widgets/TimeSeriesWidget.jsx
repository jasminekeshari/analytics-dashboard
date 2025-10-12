// frontend/src/components/widgets/TimeSeriesWidget.jsx
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../../lib/api';
import { formatValue } from '../../utils/helpers';

/**
 * Time Series Widget - Line chart showing data over time
 * 
 * Features:
 * - Displays trends over time (sales, sessions, etc.)
 * - Responsive and animated
 * - Shows tooltips on hover
 */

export default function TimeSeriesWidget({ config }) {
  const { title, source, range, showAvg } = config;
  
  // Fetch time series data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['timeseries', source, range],
    queryFn: () => api.getTimeSeries({ source, range }),
    refetchInterval: 120000, // Refresh every 2 minutes
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
  if (!data?.points || data.points.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="text-center">
          <p className="text-gray-500 mb-2">No data available</p>
          <p className="text-sm text-gray-400">Try selecting a different date range</p>
        </div>
      </div>
    );
  }
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload[0]) return null;
    
    const point = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-700">{point.t}</p>
        <p className="text-lg font-bold text-blue-600">
          {formatValue(point.v, data.meta.unit)}
        </p>
      </div>
    );
  };
  
  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{data.points.length} data points</p>
      </div>
      
      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data.points} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="t" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
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
          <Line 
            type="monotone" 
            dataKey="v" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 3 }}
            activeDot={{ r: 5 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}