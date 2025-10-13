// frontend/src/store/dashboardStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDashboardStore = create(
  persist(
    (set, get) => ({
      currentDashboard: null,
      history: [],
      historyIndex: -1,
      selectedWidget: null,
      
      // Set the entire dashboard
      setDashboard: (dashboard) => {
        set({ currentDashboard: dashboard });
        get().addToHistory(dashboard);
      },
      
      // Update dashboard layout
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
        
        console.log('💾 Updating widget config:', widgetId, newConfig);
        
        const updated = {
          ...current,
          layout: current.layout.map(w =>
            w.i === widgetId ? { ...w, config: newConfig } : w
          )
        };
        
        console.log('💾 Updated dashboard:', updated);
        
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
          i: `w${Date.now()}`,
          x: (widget.x + 2) % 12,
          y: widget.y + 1,
        };
        
        get().addWidget(newWidget);
      },
      
      // Select widget for configuration
      selectWidget: (widgetId) => {
        console.log('📝 Store: selectWidget called with ID:', widgetId);
        set({ selectedWidget: widgetId });
      },
      
      // Clear widget selection
      clearSelection: () => {
        console.log('📝 Store: clearSelection called');
        set({ selectedWidget: null });
      },
      
      // History management
      addToHistory: (dashboard) => {
        const { history, historyIndex } = get();
        
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(dashboard)));
        
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
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({
            currentDashboard: JSON.parse(JSON.stringify(history[newIndex])),
            historyIndex: newIndex
          });
        }
      },
      
      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({
            currentDashboard: JSON.parse(JSON.stringify(history[newIndex])),
            historyIndex: newIndex
          });
        }
      },
      
      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,
    }),
    {
      name: 'dashboard-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useDashboardStore;