import { create } from "zustand";
import { socket } from "../socket";

export const useChatStore = create((set) => ({
  messages: [],

  sendMessage: (data) => {
    socket.emit("sendMessage", data);
  },

  listenMessages: () => {
    socket.on("receiveMessage", (msg) => {
      set((state) => ({
        messages: [...state.messages, msg]
      }));
    });
  }
}));
