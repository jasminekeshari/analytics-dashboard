// frontend/src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (email, password, role = 'editor') => {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return Promise.reject(new Error('Invalid email format'));
        }
        
        // Validate password length
        if (password.length < 6) {
          return Promise.reject(new Error('Password must be at least 6 characters'));
        }
        
        // Create user object
        const user = {
          email,
          role, // Use the role selected by user
          name: email.split('@')[0],
        };
        
        set({ user, isAuthenticated: true });
        console.log('✅ User logged in:', user);
        return Promise.resolve(user);
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
        console.log('👋 User logged out');
      },
      
      canEdit: () => {
        const state = useAuthStore.getState();
        return state.user?.role === 'editor' || state.user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;