// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Plus, Undo, Redo, Save, LogOut, LayoutDashboard } from 'lucide-react';
import useAuthStore from './store/authStore';
import useDashboardStore from './store/dashboardStore';
import { api } from './lib/api';
import Login from './components/auth/Login';
import DashboardCanvas from './components/dashboard/DashboardCanvas';
import WidgetGallery from './components/dashboard/WidgetGallery';
import WidgetConfigPanel from './components/dashboard/WidgetConfigPanel';

// Create QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Main App Component
 * 
 * Structure:
 * 1. Auth Check (show login if not authenticated)
 * 2. Top Navigation Bar
 * 3. Dashboard Canvas (main content)
 * 4. Widget Gallery (sidebar)
 */

function AppContent() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { 
    currentDashboard, 
    setDashboard, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useDashboardStore();
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load default dashboard on mount
  useEffect(() => {
    if (isAuthenticated && !currentDashboard) {
      loadDefaultDashboard();
    }
  }, [isAuthenticated]);
  
  const loadDefaultDashboard = async () => {
    try {
      const dashboards = await api.getDashboards();
      if (dashboards.length > 0) {
        setDashboard(dashboards[0]);
      } else {
        // Create a new empty dashboard
        const newDashboard = {
          id: 'default',
          name: 'My Dashboard',
          version: 1,
          layout: [],
        };
        setDashboard(newDashboard);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Create empty dashboard on error
      setDashboard({
        id: 'default',
        name: 'My Dashboard',
        version: 1,
        layout: [],
      });
    }
  };
  
  const handleSave = async () => {
    if (!currentDashboard) return;
    
    setIsSaving(true);
    try {
      await api.updateDashboard(currentDashboard.id, currentDashboard);
      alert('Dashboard saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save dashboard');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Dashboard Name */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Analytics Dashboard
                </h1>
              </div>
              {currentDashboard && (
                <span className="text-gray-500">
                  / {currentDashboard.name}
                </span>
              )}
            </div>
            
            {/* Right: Actions & User */}
            <div className="flex items-center gap-3">
              {/* Undo/Redo */}
              <div className="flex items-center gap-1 mr-2">
                <button
                  onClick={undo}
                  disabled={!canUndo()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Undo"
                >
                  <Undo className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Redo"
                >
                  <Redo className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              {/* Add Widget Button */}
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Widget
              </button>
              
              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              
              {/* User Menu */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-300">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <DashboardCanvas />
      </main>
      
      {/* Widget Gallery Sidebar */}
      <WidgetGallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}