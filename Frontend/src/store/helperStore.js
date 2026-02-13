import { create } from "zustand";
import api from "../lib/axios";

export const useHelperStore = create((set) => ({
  helpers: [],
  stats: null,

  fetchHelpersByCategory: async (category) => {
    const res = await api.get(`/helpers/category/${category}`);
    set({ helpers: res.data.helpers });
  },

  toggleAvailability: async () => {
    await api.put("/helpers/availability");
  },

  fetchHelperDashboard: async () => {
    const res = await api.get("/helpers/dashboard");
    set({ stats: res.data.stats });
  }
}));
