// frontend/src/components/dashboard/WidgetConfigPanel.jsx
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import useDashboardStore from '../../store/dashboardStore';
import { getWidgetDefinition } from '../widgets/widgetRegistry';

export default function WidgetConfigPanel() {
  const { selectedWidget, currentDashboard, updateWidgetConfig, clearSelection } = useDashboardStore();
  
  const [config, setConfig] = useState(null);
  
  // Load widget config when selected
  useEffect(() => {
    if (selectedWidget && currentDashboard) {
      const widget = currentDashboard.layout.find(w => w.i === selectedWidget);
      if (widget) {
        setConfig({ ...widget.config });
      }
    } else {
      setConfig(null);
    }
  }, [selectedWidget, currentDashboard]);
  
  // Don't render if no widget selected or no config loaded
  if (!selectedWidget || !config || !currentDashboard) return null;
  
  const widget = currentDashboard.layout.find(w => w.i === selectedWidget);
  if (!widget) return null;
  
  const definition = getWidgetDefinition(widget.widgetType);
  
 const handleSave = () => {
  console.log('💾 Saving config:', config);
  updateWidgetConfig(selectedWidget, config);
  clearSelection();
  
  // Force a small delay to ensure state updates
  setTimeout(() => {
    console.log('✅ Config saved!');
  }, 100);
};
  const handleCancel = () => {
    clearSelection();
  };
  
  // Render different form fields based on widget type
  const renderConfigFields = () => {
    const widgetType = widget.widgetType;
    
    // Common: Title field
    const titleField = (
      <div key="title">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Widget Title
        </label>
        <input
          type="text"
          value={config.title || ''}
          onChange={(e) => setConfig({ ...config, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter widget title"
        />
      </div>
    );
    
    // Time Series Chart
    if (widgetType === 'chart.timeseries') {
      return (
        <>
          {titleField}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Source
            </label>
            <select
              value={config.source || 'sales'}
              onChange={(e) => setConfig({ ...config, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="sales">Sales (₹)</option>
              <option value="sessions">Sessions</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={config.range || '30d'}
              onChange={(e) => setConfig({ ...config, range: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </>
      );
    }
    
    // Bar Chart
    if (widgetType === 'chart.bar') {
      return (
        <>
          {titleField}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Source
            </label>
            <select
              value={config.source || 'topProducts'}
              onChange={(e) => setConfig({ ...config, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="topProducts">Top Products</option>
              <option value="mixByStatus">Order Status Mix</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Items
            </label>
            <input
              type="number"
              min="3"
              max="10"
              value={config.limit || 5}
              onChange={(e) => setConfig({ ...config, limit: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      );
    }
    
    // Pie Chart
    if (widgetType === 'chart.pie') {
      return (
        <>
          {titleField}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Source
            </label>
            <select
              value={config.source || 'mixByStatus'}
              onChange={(e) => setConfig({ ...config, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="mixByStatus">Order Status Mix</option>
              <option value="topProducts">Top Products</option>
            </select>
          </div>
        </>
      );
    }
    
    // KPI Simple
    if (widgetType === 'kpi.simple') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metric
            </label>
            <select
              value={config.metric || 'todaySales'}
              onChange={(e) => setConfig({ ...config, metric: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="todaySales">Sales (Today)</option>
              <option value="activeUsers">Active Users</option>
              <option value="ordersToday">Orders (Today)</option>
              <option value="convRate">Conversion Rate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decimal Precision
            </label>
            <input
              type="number"
              min="0"
              max="2"
              value={config.precision || 0}
              onChange={(e) => setConfig({ ...config, precision: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      );
    }
    
    // Orders Table
    if (widgetType === 'table.orders') {
      return (
        <>
          {titleField}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={config.status || 'all'}
              onChange={(e) => setConfig({ ...config, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Orders</option>
              <option value="paid">Paid Only</option>
              <option value="pending">Pending Only</option>
              <option value="failed">Failed Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rows per Page
            </label>
            <select
              value={config.pageSize || 10}
              onChange={(e) => setConfig({ ...config, pageSize: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
            </select>
          </div>
        </>
      );
    }
    
    // Users Table
    if (widgetType === 'table.users') {
      return (
        <>
          {titleField}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Role
            </label>
            <select
              value={config.role || 'all'}
              onChange={(e) => setConfig({ ...config, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              <option value="admin">Admin Only</option>
              <option value="advisor">Advisor Only</option>
              <option value="user">User Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rows per Page
            </label>
            <select
              value={config.pageSize || 10}
              onChange={(e) => setConfig({ ...config, pageSize: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
            </select>
          </div>
        </>
      );
    }
    
    // Markdown/Notes Widget
    if (widgetType === 'notes.markdown') {
      return (
        <>
          {titleField}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (Markdown)
            </label>
            <textarea
              value={config.content || ''}
              onChange={(e) => setConfig({ ...config, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
              placeholder="# Heading&#10;&#10;Your notes here...&#10;&#10;- Bullet point&#10;**Bold text**"
              rows={12}
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Supports: <code className="bg-gray-100 px-1 rounded"># headings</code>, <code className="bg-gray-100 px-1 rounded">**bold**</code>, <code className="bg-gray-100 px-1 rounded">- bullets</code>
            </p>
          </div>
        </>
      );
    }
    
    // Multi-KPI (no config needed, just title)
    if (widgetType === 'kpi.multi') {
      return (
        <>
          <div>
            <p className="text-sm text-gray-600 mb-4">
              This widget displays Sales, Orders, and Conversion Rate metrics.
            </p>
          </div>
        </>
      );
    }
    
    // Default
    return titleField;
  };
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[200]"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[201] w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Configure Widget</h2>
            <p className="text-sm text-gray-600 mt-1">{definition?.title || 'Widget Settings'}</p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Form */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {renderConfigFields()}
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}