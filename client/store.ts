import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      login: async (credentials: any) => {
        try {
          const response = await fetch(
            "https://shared-server.onrender.com/api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );
          const data = await response.json();
          if (response.ok) {
            set({ isLoggedIn: true, user: data.user, token: data.token });
          }
        } catch (error) {
          console.log("Something went wrong while fetching login:", error);
        }
      },
      logout: () => set({ isLoggedIn: false, token: null, user: null }),
      register: async (userData: any) => {
        try {
          const response = await fetch(
            "https://shared-server.onrender.com/api/auth/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );
          const data = await response.json();
          if (response.ok) {
            set({ isLoggedIn: true, user: data.user, token: data.token });
          }
        } catch (error) {
          console.log("Something went wrong while fetching register:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
