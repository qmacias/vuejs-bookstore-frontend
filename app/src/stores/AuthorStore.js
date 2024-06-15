import { defineStore } from "pinia";

export const useAuthorStore = defineStore('AuthorStore', {
    state: () => ({
        list: [
            {
                id: '34c045ce-cd8a-4ff7-a9fe-2bff4289331d',
                name: 'Erik Larson',
            },
            {
                id: '12fbdc9c-6fa1-46cb-8f4b-e33b0373db91',
                name: 'Bonnie Blaylock',
            },
            {
                id: 'b5c09148-c073-4bd4-909c-30ec51360377',
                name: 'Stephen King',
            },
        ],
    }),
    actions: {
        addAuthor(author) {
            this.list.push(author);
        },
        getAuthor(id) {
            return this.list.find(author => author.id === id);
        },
        deleteAuthor(id) {
            this.list = this.list.filter(author => author.id !== id);
        },
    },
});
