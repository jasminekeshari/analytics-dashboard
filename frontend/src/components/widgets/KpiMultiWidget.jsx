// frontend/src/components/widgets/WidgetRenderer.jsx
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { WIDGET_TYPES } from './widgetRegistry';

/**
 * Widget Renderer - Dynamically renders widgets with error boundaries
 * 
 * This component:
 * - Lazy loads widgets (code splitting for performance)
 * - Wraps each widget in an error boundary (if one breaks, others still work)
 * - Shows loading states while widgets load
 */

// Lazy load widgets for better performance (only load when needed)
const KpiSimpleWidget = lazy(() => import('./KpiSimpleWidget'));
const KpiMultiWidget = lazy(() => import('./KpiMultiWidget'));
const TimeSeriesWidget = lazy(() => import('./TimeSeriesWidget'));
const BarChartWidget = lazy(() => import('./BarChartWidget'));
const PieChartWidget = lazy(() => import('./PieChartWidget'));
const OrdersTableWidget = lazy(() => import('./OrdersTableWidget'));
const UsersTableWidget = lazy(() => import('./UsersTableWidget'));
const MarkdownWidget = lazy(() => import('./MarkdownWidget'));

// Fallback component when a widget crashes
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-red-50 rounded-lg border-2 border-red-200">
      <div className="text-center p-4">
        <h3 className="text-red-700 font-semibold mb-2">Widget Error</h3>
        <p className="text-red-600 text-sm mb-3">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

// Loading skeleton while widget loads
function WidgetSkeleton() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="text-sm text-gray-500">Loading widget...</p>
      </div>
    </div>
  );
}

export default function WidgetRenderer({ widgetType, config }) {
  // Select the appropriate widget component
  const getWidgetComponent = () => {
    switch (widgetType) {
      case WIDGET_TYPES.KPI_SIMPLE:
        return KpiSimpleWidget;
      case WIDGET_TYPES.KPI_MULTI:
        return KpiMultiWidget;
      case WIDGET_TYPES.TIMESERIES:
        return TimeSeriesWidget;
      case WIDGET_TYPES.BAR:
        return BarChartWidget;
      case WIDGET_TYPES.PIE:
        return PieChartWidget;
      case WIDGET_TYPES.ORDERS_TABLE:
        return OrdersTableWidget;
      case WIDGET_TYPES.USERS_TABLE:
        return UsersTableWidget;
      // Add more widgets here as you create them
      default:
        return () => (
          <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-300">
            <p className="text-gray-600">Unknown widget: {widgetType}</p>
          </div>
        );
    }
  };
  
  const WidgetComponent = getWidgetComponent();
  
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset widget state if needed
        console.log('Widget reset:', widgetType);
      }}
    >
      <Suspense fallback={<WidgetSkeleton />}>
        <WidgetComponent config={config} />
      </Suspense>
    </ErrorBoundary>
  );
}