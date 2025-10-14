// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Plus, Undo, Redo, Save, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import useAuthStore from './store/authStore';
import useDashboardStore from './store/dashboardStore';
import { api } from './lib/api';
import Login from './components/auth/Login';
import DashboardCanvas from './components/dashboard/DashboardCanvas';
import WidgetGallery from './components/dashboard/WidgetGallery';
import WidgetConfigPanel from './components/dashboard/WidgetConfigPanel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
      alert('Dashboard saved!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar - RESPONSIVE */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-6 py-3 lg:py-4">
          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
              </div>
              {currentDashboard && (
                <span className="text-gray-500">/ {currentDashboard.name}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={undo}
                  disabled={!canUndo()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <Undo className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo()}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Redo"
                >
                  <Redo className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Widget
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 font-medium"
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              
              <div className="flex items-center gap-3 pl-3 border-l border-gray-300">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-gray-200 space-y-2">
              <button
                onClick={() => { setIsGalleryOpen(true); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Add Widget
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={undo}
                  disabled={!canUndo()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30"
                >
                  <Undo className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30"
                >
                  <Redo className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  <Save className="w-5 h-5 mx-auto" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 bg-red-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <DashboardCanvas />
      </main>
      
      <WidgetGallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
      />
      
      <WidgetConfigPanel />
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