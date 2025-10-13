// frontend/src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth Store - Manages user authentication with persistence
 */

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      // Login function
      login: (email, password, role = 'editor') => {
        const user = {
          email,
          role,
          name: email.split('@')[0],
        };
        
        set({ user, isAuthenticated: true });
        console.log('✅ User logged in:', user);
        return Promise.resolve(user);
      },
      
      // Logout function
      logout: () => {
        set({ user: null, isAuthenticated: false });
        console.log('👋 User logged out');
      },
      
      // Check if user can edit
      canEdit: () => {
        const state = useAuthStore.getState();
        return state.user?.role === 'editor' || state.user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useAuthStore;