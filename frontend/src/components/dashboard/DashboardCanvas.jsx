// frontend/src/components/dashboard/DashboardCanvas.jsx
import { useMemo } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Settings, Copy, Trash2 } from "lucide-react";
import useDashboardStore from "../../store/dashboardStore";
import useAuthStore from "../../store/authStore";
import WidgetRenderer from "../widgets/WidgetRenderer";

export default function DashboardCanvas() {
  const {
    currentDashboard,
    updateLayout,
    removeWidget,
    duplicateWidget,
    selectWidget,
  } = useDashboardStore();
  const { canEdit } = useAuthStore();

  const isEditable = canEdit();

  // Convert layout BEFORE any conditional returns (React Rules of Hooks)
  const layout = useMemo(() => {
    if (!currentDashboard?.layout) return [];

    return currentDashboard.layout.map((widget) => ({
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

    const updatedLayout = newLayout.map((item) => {
      const existingWidget = currentDashboard.layout.find(
        (w) => w.i === item.i
      );
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Dashboard Selected
          </h2>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Empty dashboard
  if (!currentDashboard.layout || currentDashboard.layout.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Empty Dashboard
          </h2>
          <p className="text-gray-600 mb-4">
            Add widgets from the gallery to get started
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <span className="text-2xl">👆</span>
            <p className="text-sm font-medium">
              Click "Add Widget" button at the top
            </p>
          </div>
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
        draggableHandle=".drag-handle"
      >
        {currentDashboard.layout.map((widget) => (
          <div key={widget.i} className="relative group">
            {/* Drag Handle (invisible but functional) */}
            <div
              className="drag-handle absolute inset-0 cursor-move"
              style={{ zIndex: 1 }}
            />

            {/* Widget Controls */}
            {isEditable && (
              <div
                className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ zIndex: 100 }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("🔧 Gear clicked for widget:", widget.i);
                    const selectFn = useDashboardStore.getState().selectWidget;
                    console.log("🔧 selectWidget function:", selectFn);
                    selectFn(widget.i);
                    console.log("🔧 Widget selected!");
                  }}
                  className="p-2 bg-white rounded-md hover:bg-blue-50 transition-colors border border-gray-300 shadow-lg"
                  title="Configure Widget"
                  type="button"
                >
                  <Settings className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("📋 Duplicate clicked for widget:", widget.i);
                    duplicateWidget(widget.i);
                  }}
                  className="p-2 bg-white rounded-md hover:bg-green-50 transition-colors border border-gray-300 shadow-lg"
                  title="Duplicate Widget"
                  type="button"
                >
                  <Copy className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("🗑️ Delete clicked for widget:", widget.i);
                    if (window.confirm("Delete this widget?")) {
                      removeWidget(widget.i);
                    }
                  }}
                  className="p-2 bg-white rounded-md hover:bg-red-50 transition-colors border border-gray-300 shadow-lg"
                  title="Delete Widget"
                  type="button"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}

            {/* Widget Content */}
            <div
              className="h-full w-full"
              style={{ zIndex: 2, position: "relative" }}
            >
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
