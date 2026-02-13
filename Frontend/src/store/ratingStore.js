import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

export const useRatingStore = create((set) => ({
  ratings: [],

  submitRating: async (data) => {
    await api.post("/ratings", data);
    toast.success("Rating Submitted");
  },

  fetchRatings: async (id) => {
    const res = await api.get(`/ratings/${id}`);
    set({ ratings: res.data.ratings });
  }
}));
