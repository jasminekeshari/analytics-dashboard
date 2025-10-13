// frontend/src/components/dashboard/DashboardCanvas.jsx
import { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Settings, Copy, Trash2 } from 'lucide-react';
import useDashboardStore from '../../store/dashboardStore';
import useAuthStore from '../../store/authStore';
import WidgetRenderer from '../widgets/WidgetRenderer';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardCanvas() {
  const { currentDashboard, updateLayout, removeWidget, duplicateWidget, selectWidget } = useDashboardStore();
  const { canEdit } = useAuthStore();
  
  const isEditable = canEdit();
  
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
  
  const handleLayoutChange = (newLayout) => {
    if (!isEditable || !currentDashboard) return;
    
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
  
  if (!currentDashboard) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Dashboard...</h2>
        </div>
      </div>
    );
  }
  
  if (!currentDashboard.layout || currentDashboard.layout.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Empty Dashboard</h2>
          <p className="text-gray-600 mb-4">Click "Add Widget" to get started</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full p-6 bg-gray-50 overflow-auto">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        isDraggable={isEditable}
        isResizable={isEditable}
        onLayoutChange={handleLayoutChange}
        compactType={null}
        preventCollision={false}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        draggableCancel=".no-drag"
      >
        {currentDashboard.layout.map((widget) => (
          <div key={widget.i} className="relative">
            {/* Widget Controls - NO-DRAG CLASS */}
            {isEditable && (
              <div className="no-drag absolute -top-3 right-2 z-[1000] flex gap-1 bg-white rounded-lg shadow-xl p-1 border-2 border-gray-300">
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('⚙️ Gear clicked for:', widget.i);
                    selectWidget(widget.i);
                  }}
                  className="p-2 hover:bg-blue-100 rounded transition-colors cursor-pointer"
                  type="button"
                  title="Settings"
                >
                  <Settings className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('📋 Duplicate clicked for:', widget.i);
                    duplicateWidget(widget.i);
                  }}
                  className="p-2 hover:bg-green-100 rounded transition-colors cursor-pointer"
                  type="button"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.confirm('Delete this widget?')) {
                      console.log('🗑️ Delete clicked for:', widget.i);
                      removeWidget(widget.i);
                    }
                  }}
                  className="p-2 hover:bg-red-100 rounded transition-colors cursor-pointer"
                  type="button"
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
      </ResponsiveGridLayout>
    </div>
  );
}