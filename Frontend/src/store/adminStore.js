import { create } from "zustand";
import api from "../lib/axios";

export const useAdminStore = create((set) => ({
  users: [],
  helpers: [],
  bookings: [],
  stats: null,

  fetchUsers: async () => {
    const res = await api.get("/admin/users");
    set({ users: res.data.users });
  },

  fetchHelpers: async () => {
    const res = await api.get("/admin/helpers");
    set({ helpers: res.data.helpers });
  },

  fetchBookings: async () => {
    const res = await api.get("/admin/bookings");
    set({ bookings: res.data.bookings });
  },

  fetchStats: async () => {
    const res = await api.get("/admin/stats");
    set({ stats: res.data.stats });
  }
}));
