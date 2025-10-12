// frontend/src/components/widgets/PieChartWidget.jsx
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { api } from '../../lib/api';
import { formatValue } from '../../utils/helpers';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function PieChartWidget({ config }) {
  const { title, source } = config;
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['categorical', source],
    queryFn: () => api.getCategorical({ source }),
    refetchInterval: 120000,
  });
  
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
  
  if (!data?.items || data.items.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  const renderLabel = (entry) => {
    const percent = ((entry.value / data.items.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0);
    return `${percent}%`;
  };
  
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
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{data.items.length} categories</p>
      </div>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.items}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationDuration={800}
            >
              {data.items.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => entry.payload.label}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}