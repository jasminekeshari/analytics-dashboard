// frontend/src/components/dashboard/WidgetGallery.jsx
import { X } from 'lucide-react';
import { getWidgetsByCategory, createWidget } from '../widgets/widgetRegistry';
import useDashboardStore from '../../store/dashboardStore';

/**
 * Widget Gallery - Panel to browse and add widgets
 * 
 * Shows all available widgets grouped by category.
 * Click a widget to add it to the dashboard.
 */

export default function WidgetGallery({ isOpen, onClose }) {
  const { addWidget } = useDashboardStore();
  
  const widgetsByCategory = getWidgetsByCategory();
  
  const handleAddWidget = (widgetType) => {
    // Create a new widget with default config
    const newWidget = createWidget(widgetType, {
      x: 0,
      y: 0, // Will be placed at the top
    });
    
    addWidget(newWidget);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Widget Gallery</h2>
            <p className="text-sm text-gray-600 mt-1">Click to add to dashboard</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Widget List */}
        <div className="flex-1 overflow-auto p-6">
          {Object.entries(widgetsByCategory).map(([category, widgets]) => (
            <div key={category} className="mb-8">
              {/* Category Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {category}
                <span className="text-sm font-normal text-gray-500">
                  ({widgets.length})
                </span>
              </h3>
              
              {/* Widget Cards */}
              <div className="space-y-3">
                {widgets.map((widget) => {
                  const Icon = widget.icon;
                  return (
                    <button
                      key={widget.id}
                      onClick={() => handleAddWidget(widget.id)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {widget.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {widget.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Size: {widget.defaultSize.w}×{widget.defaultSize.h} grid units
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}