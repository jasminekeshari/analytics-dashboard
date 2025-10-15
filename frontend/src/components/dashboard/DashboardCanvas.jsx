// frontend/src/components/dashboard/DashboardCanvas.jsx
import { useMemo, useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Settings, Copy, Trash2, Maximize2 } from 'lucide-react';
import useDashboardStore from '../../store/dashboardStore';
import useAuthStore from '../../store/authStore';
import WidgetRenderer from '../widgets/WidgetRenderer';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardCanvas() {
  const { currentDashboard, updateLayout, removeWidget, duplicateWidget, selectWidget } = useDashboardStore();
  const { canEdit } = useAuthStore();
  
  const [isMobile, setIsMobile] = useState(false);
  
  const isEditable = canEdit();
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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
      <div className="h-full flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Loading Dashboard...</h2>
        </div>
      </div>
    );
  }
  
  if (!currentDashboard.layout || currentDashboard.layout.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Empty Dashboard</h2>
          <p className="text-sm lg:text-base text-gray-600 mb-4">Click "Add Widget" to get started</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full p-2 lg:p-6 bg-gray-50 overflow-auto">
      {/* Mobile Instruction Banner */}
      {isEditable && isMobile && (
        <div className="mb-3 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg">
          <p className="text-xs font-semibold flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            <span>Touch & hold the drag icon (top-left) to move • Touch & hold resize icon (bottom-right) to resize</span>
          </p>
        </div>
      )}
      
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={isMobile ? 100 : 80}
        isDraggable={isEditable}
        isResizable={isEditable}
        onLayoutChange={handleLayoutChange}
        compactType="vertical"
        preventCollision={false}
        margin={isMobile ? [8, 8] : [16, 16]}
        containerPadding={[0, 0]}
        draggableCancel=".no-drag"
        draggableHandle=".drag-handle"
      >
        {currentDashboard.layout.map((widget) => (
          <div key={widget.i} className="relative widget-container">
            {/* Drag Handle - ALL DEVICES */}
            {isEditable && (
              <div 
                className="drag-handle absolute top-1 left-1 z-[999] bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg cursor-move active:from-blue-600 active:to-blue-700 flex items-center justify-center"
                style={{ 
                  width: isMobile ? '40px' : '36px', 
                  height: isMobile ? '40px' : '36px',
                  touchAction: 'none'
                }}
                title="Drag to move"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </div>
            )}
            
            {/* Widget Control Buttons */}
            {isEditable && (
              <div className="no-drag absolute -top-2 right-1 lg:-top-3 lg:right-2 z-[1000] flex gap-0.5 lg:gap-1 bg-white rounded-lg shadow-xl p-0.5 lg:p-1 border-2 border-gray-300">
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectWidget(widget.i);
                  }}
                  className="p-2 hover:bg-blue-100 active:bg-blue-200 rounded transition-colors"
                  type="button"
                  style={{ minWidth: isMobile ? '44px' : 'auto', minHeight: isMobile ? '44px' : 'auto' }}
                >
                  <Settings className="w-4 h-4 lg:w-4 lg:h-4 text-blue-600" />
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    duplicateWidget(widget.i);
                  }}
                  className="p-2 hover:bg-green-100 active:bg-green-200 rounded transition-colors"
                  type="button"
                  style={{ minWidth: isMobile ? '44px' : 'auto', minHeight: isMobile ? '44px' : 'auto' }}
                >
                  <Copy className="w-4 h-4 lg:w-4 lg:h-4 text-green-600" />
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.confirm('Delete this widget?')) {
                      removeWidget(widget.i);
                    }
                  }}
                  className="p-2 hover:bg-red-100 active:bg-red-200 rounded transition-colors"
                  type="button"
                  style={{ minWidth: isMobile ? '44px' : 'auto', minHeight: isMobile ? '44px' : 'auto' }}
                >
                  <Trash2 className="w-4 h-4 lg:w-4 lg:h-4 text-red-600" />
                </button>
              </div>
            )}
            
            {/* Widget Content */}
            <div className="h-full w-full widget-content">
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