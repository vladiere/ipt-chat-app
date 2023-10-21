import { defineStore } from "pinia";

export const useMessageStore = defineStore('messages', {
    state: () => ({
        messages: []
    }),
    getters: {
        getAllMessages: (state) => state.messages,
    },
    actions: {
        addMessage(socket_id, msg, user_id, date_send, msg_status) {
            this.state.push(socket_id, msg, user_id, date_send, msg_status);
        },
        clearMessage() {
            this.state = [];
        }
    }
})