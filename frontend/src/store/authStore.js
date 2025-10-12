// frontend/src/store/authStore.js
import { create } from 'zustand';

/**
 * Auth Store - Manages user authentication (mock)
 * 
 * In a real app, this would connect to a backend auth service.
 * Here, we're just storing user info in memory.
 */

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  // Login function (accepts any email/password)
  login: (email, password, role = 'editor') => {
    const user = {
      email,
      role, // 'editor' can edit, 'viewer' can only view
      name: email.split('@')[0], // Extract name from email
    };
    
    set({ user, isAuthenticated: true });
    
    // In a real app, you'd get a token from the backend
    // For now, we're just storing in memory
    return Promise.resolve(user);
  },
  
  // Logout function
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  // Check if user can edit
  canEdit: () => {
    const { user } = useAuthStore.getState();
    return user?.role === 'editor' || user?.role === 'admin';
  },
}));

export default useAuthStore;