// frontend/src/components/dashboard/DashboardCanvas.jsx
import { useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Settings, Copy, Trash2 } from 'lucide-react';
import useDashboardStore from '../../store/dashboardStore';
import useAuthStore from '../../store/authStore';
import WidgetRenderer from '../widgets/WidgetRenderer';

/**
 * Dashboard Canvas - The main grid where widgets are placed
 */

export default function DashboardCanvas() {
  const { currentDashboard, updateLayout, removeWidget, duplicateWidget, selectWidget } = useDashboardStore();
  const { canEdit } = useAuthStore();
  
  const isEditable = canEdit();
  
  // ⚠️ IMPORTANT: Convert layout BEFORE any conditional returns
  const layout = useMemo(() => {
    if (!currentDashboard?.layout) return [];
    
    return currentDashboard.layout.map(widget => ({
      i: widget.i,
      x: widget.x,
      y: widget.y,
      w: widget.w,
      h: widget.h,
      minW: 2,
      minH: 2,
    }));
  }, [currentDashboard?.layout]);
  
  // Handle layout changes (drag/resize)
  const handleLayoutChange = (newLayout) => {
    if (!isEditable || !currentDashboard) return;
    
    // Merge new positions with existing widget data
    const updatedLayout = newLayout.map(item => {
      const existingWidget = currentDashboard.layout.find(w => w.i === item.i);
      return {
        ...existingWidget,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      };
    });
    
    updateLayout(updatedLayout);
  };
  
  // If no dashboard is loaded
  if (!currentDashboard) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Dashboard Selected</h2>
          <p className="text-gray-600">Create or select a dashboard to get started</p>
        </div>
      </div>
    );
  }
  
  // Empty dashboard
  if (!currentDashboard.layout || currentDashboard.layout.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Empty Dashboard</h2>
          <p className="text-gray-600 mb-4">Add widgets from the gallery to get started</p>
          <p className="text-sm text-gray-500">👆 Click "Add Widget" button at the top</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full p-4 bg-gray-50 overflow-auto">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={80}
        width={1200}
        isDraggable={isEditable}
        isResizable={isEditable}
        onLayoutChange={handleLayoutChange}
        compactType={null}
        preventCollision={false}
        margin={[16, 16]}
      >
        {currentDashboard.layout.map((widget) => (
          <div key={widget.i} className="relative group">
            {/* Widget Controls (show on hover) */}
            {isEditable && (
              <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => selectWidget(widget.i)}
                  className="p-1.5 bg-white rounded-md shadow-md hover:bg-blue-50 transition-colors"
                  title="Configure"
                >
                  <Settings className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => duplicateWidget(widget.i)}
                  className="p-1.5 bg-white rounded-md shadow-md hover:bg-green-50 transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this widget?')) {
                      removeWidget(widget.i);
                    }
                  }}
                  className="p-1.5 bg-white rounded-md shadow-md hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}
            
            {/* Widget Content */}
            <div className="h-full w-full">
              <WidgetRenderer
                widgetType={widget.widgetType}
                config={widget.config}
              />
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}