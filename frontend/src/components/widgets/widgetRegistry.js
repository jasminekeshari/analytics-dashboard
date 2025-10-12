// frontend/src/components/widgets/widgetRegistry.js

/**
 * Widget Registry - Central place that knows about all widgets
 * 
 * Think of this as a catalog/menu of all available widgets.
 * Each widget registers itself here with:
 * - id: Unique identifier
 * - title: Display name
 * - description: What it does
 * - icon: Icon component (from lucide-react)
 * - defaultConfig: Starting configuration
 * - defaultSize: Grid size (w, h)
 */

import { 
  LineChart, 
  BarChart3, 
  PieChart, 
  Table, 
  Activity,
  FileText,
  TrendingUp
} from 'lucide-react';

// We'll import actual widget components later
// For now, we're just defining the metadata

export const WIDGET_TYPES = {
  // Charts
  TIMESERIES: 'chart.timeseries',
  BAR: 'chart.bar',
  PIE: 'chart.pie',
  
  // Tables
  ORDERS_TABLE: 'table.orders',
  USERS_TABLE: 'table.users',
  
  // KPIs
  KPI_SIMPLE: 'kpi.simple',
  KPI_MULTI: 'kpi.multi',
  
  // Other
  MARKDOWN: 'notes.markdown',
};

/**
 * Widget definitions with metadata
 */
export const WIDGET_DEFINITIONS = {
  [WIDGET_TYPES.TIMESERIES]: {
    id: WIDGET_TYPES.TIMESERIES,
    title: 'Time Series Chart',
    description: 'Line chart showing data over time',
    icon: LineChart,
    category: 'Charts',
    defaultSize: { w: 6, h: 4 },
    defaultConfig: {
      title: 'Sales Trend',
      source: 'sales',
      range: '30d',
      showAvg: false,
    },
  },
  
  [WIDGET_TYPES.BAR]: {
    id: WIDGET_TYPES.BAR,
    title: 'Bar Chart',
    description: 'Compare values across categories',
    icon: BarChart3,
    category: 'Charts',
    defaultSize: { w: 6, h: 4 },
    defaultConfig: {
      title: 'Top Products',
      source: 'topProducts',
      limit: 5,
    },
  },
  
  [WIDGET_TYPES.PIE]: {
    id: WIDGET_TYPES.PIE,
    title: 'Pie Chart',
    description: 'Show distribution as percentages',
    icon: PieChart,
    category: 'Charts',
    defaultSize: { w: 4, h: 4 },
    defaultConfig: {
      title: 'Order Status Mix',
      source: 'mixByStatus',
    },
  },
  
  [WIDGET_TYPES.ORDERS_TABLE]: {
    id: WIDGET_TYPES.ORDERS_TABLE,
    title: 'Orders Table',
    description: 'View and filter orders',
    icon: Table,
    category: 'Tables',
    defaultSize: { w: 6, h: 5 },
    defaultConfig: {
      title: 'Recent Orders',
      status: 'all',
      pageSize: 10,
      columns: ['id', 'customer', 'total', 'status', 'createdAt'],
    },
  },
  
  [WIDGET_TYPES.USERS_TABLE]: {
    id: WIDGET_TYPES.USERS_TABLE,
    title: 'Users Table',
    description: 'View and filter users',
    icon: Table,
    category: 'Tables',
    defaultSize: { w: 6, h: 5 },
    defaultConfig: {
      title: 'Users',
      role: 'all',
      pageSize: 10,
      columns: ['id', 'name', 'role', 'status', 'createdAt'],
    },
  },
  
  [WIDGET_TYPES.KPI_SIMPLE]: {
    id: WIDGET_TYPES.KPI_SIMPLE,
    title: 'Single KPI',
    description: 'Display one key metric',
    icon: Activity,
    category: 'KPIs',
    defaultSize: { w: 3, h: 2 },
    defaultConfig: {
      metric: 'todaySales',
      precision: 0,
    },
  },
  
  [WIDGET_TYPES.KPI_MULTI]: {
    id: WIDGET_TYPES.KPI_MULTI,
    title: 'Multi KPI',
    description: 'Display multiple metrics in one card',
    icon: TrendingUp,
    category: 'KPIs',
    defaultSize: { w: 6, h: 2 },
    defaultConfig: {
      metrics: ['todaySales', 'ordersToday', 'convRate'],
    },
  },
  
  [WIDGET_TYPES.MARKDOWN]: {
    id: WIDGET_TYPES.MARKDOWN,
    title: 'Notes',
    description: 'Add text notes or documentation',
    icon: FileText,
    category: 'Other',
    defaultSize: { w: 4, h: 3 },
    defaultConfig: {
      title: 'Notes',
      content: '# Notes\n\nAdd your notes here...',
    },
  },
};

/**
 * Get widget definition by ID
 */
export function getWidgetDefinition(widgetType) {
  return WIDGET_DEFINITIONS[widgetType];
}

/**
 * Get all widgets grouped by category
 */
export function getWidgetsByCategory() {
  const grouped = {};
  
  Object.values(WIDGET_DEFINITIONS).forEach(widget => {
    if (!grouped[widget.category]) {
      grouped[widget.category] = [];
    }
    grouped[widget.category].push(widget);
  });
  
  return grouped;
}

/**
 * Create a new widget instance with default values
 */
export function createWidget(widgetType, overrides = {}) {
  const definition = getWidgetDefinition(widgetType);
  if (!definition) {
    throw new Error(`Unknown widget type: ${widgetType}`);
  }
  
  return {
    i: `w${Date.now()}`, // Unique ID
    x: 0,
    y: 0,
    w: definition.defaultSize.w,
    h: definition.defaultSize.h,
    widgetType: widgetType,
    config: { ...definition.defaultConfig },
    ...overrides,
  };
}