// frontend/src/store/dashboardStore.js
import { create } from 'zustand';

/**
 * Dashboard Store - Manages dashboard state and history
 * 
 * This is like a central database for our app that:
 * - Stores current dashboard data
 * - Tracks history for undo/redo
 * - Manages which dashboard is active
 */

const useDashboardStore = create((set, get) => ({
  // Current dashboard data
  currentDashboard: null,
  
  // History for undo/redo (max 10 steps)
  history: [],
  historyIndex: -1,
  
  // UI state
  selectedWidget: null, // Which widget is being configured
  
  // ============================================
  // ACTIONS
  // ============================================
  
  // Set the entire dashboard
  setDashboard: (dashboard) => {
    set({ currentDashboard: dashboard });
    // Add to history
    get().addToHistory(dashboard);
  },
  
  // Update dashboard layout (when dragging/resizing)
  updateLayout: (newLayout) => {
    const current = get().currentDashboard;
    if (!current) return;
    
    const updated = { ...current, layout: newLayout };
    set({ currentDashboard: updated });
    get().addToHistory(updated);
  },
  
  // Add a new widget
  addWidget: (widget) => {
    const current = get().currentDashboard;
    if (!current) return;
    
    const updated = {
      ...current,
      layout: [...current.layout, widget]
    };
    set({ currentDashboard: updated });
    get().addToHistory(updated);
  },
  
  // Remove a widget
  removeWidget: (widgetId) => {
    const current = get().currentDashboard;
    if (!current) return;
    
    const updated = {
      ...current,
      layout: current.layout.filter(w => w.i !== widgetId)
    };
    set({ currentDashboard: updated });
    get().addToHistory(updated);
  },
  
  // Update widget configuration
  updateWidgetConfig: (widgetId, newConfig) => {
    const current = get().currentDashboard;
    if (!current) return;
    
    const updated = {
      ...current,
      layout: current.layout.map(w =>
        w.i === widgetId ? { ...w, config: newConfig } : w
      )
    };
    set({ currentDashboard: updated });
    get().addToHistory(updated);
  },
  
  // Duplicate a widget
  duplicateWidget: (widgetId) => {
    const current = get().currentDashboard;
    if (!current) return;
    
    const widget = current.layout.find(w => w.i === widgetId);
    if (!widget) return;
    
    const newWidget = {
      ...widget,
      i: `w${Date.now()}`, // Generate unique ID
      x: (widget.x + 2) % 12, // Offset position
      y: widget.y + 1,
    };
    
    get().addWidget(newWidget);
  },
  
  // Select widget for configuration
  selectWidget: (widgetId) => set({ selectedWidget: widgetId }),
  
  // Clear widget selection
  clearSelection: () => set({ selectedWidget: null }),
  
  // ============================================
  // HISTORY MANAGEMENT (Undo/Redo)
  // ============================================
  // History management
addToHistory: (dashboard) => {
  if (!dashboard) return;
  
  const { history, historyIndex } = get();
  
  // Remove future history if we're in the middle
  const newHistory = history.slice(0, historyIndex + 1);
  
  // Deep clone to prevent reference issues
  const cloned = JSON.parse(JSON.stringify(dashboard));
  
  // Don't add if it's identical to current
  if (newHistory.length > 0) {
    const last = newHistory[newHistory.length - 1];
    if (JSON.stringify(last) === JSON.stringify(cloned)) {
      return;
    }
  }
  
  newHistory.push(cloned);
  
  // Keep only last 10 states
  if (newHistory.length > 10) {
    newHistory.shift();
  }
  
  set({
    history: newHistory,
    historyIndex: newHistory.length - 1
  });
},

undo: () => {
  const { history, historyIndex } = get();
  if (historyIndex <= 0) return;
  
  const newIndex = historyIndex - 1;
  const dashboard = JSON.parse(JSON.stringify(history[newIndex]));
  
  set({
    currentDashboard: dashboard,
    historyIndex: newIndex
  });
},

redo: () => {
  const { history, historyIndex } = get();
  if (historyIndex >= history.length - 1) return;
  
  const newIndex = historyIndex + 1;
  const dashboard = JSON.parse(JSON.stringify(history[newIndex]));
  
  set({
    currentDashboard: dashboard,
    historyIndex: newIndex
  });
},

canUndo: () => {
  const { historyIndex } = get();
  return historyIndex > 0;
},

canRedo: () => {
  const { history, historyIndex } = get();
  return historyIndex < history.length - 1;
}
}));

export default useDashboardStore;