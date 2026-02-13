import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      set({ user: res.data.user });
      toast.success("Logged in");
    } catch {
      toast.error("Login failed");
    }
  },

  register: async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      set({ user: res.data.user });
      toast.success("Registered");
    } catch {
      toast.error("Registration failed");
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
    toast.success("Logged out");
  }
}));
