import { defineStore } from "pinia";

export const useBookStore = defineStore('BookStore', {
    state: () => ({
        list: [
            {
                id: 'b559a15b-cc99-456a-8f3f-bdc35bc9f104',
                title: 'The Demon Of Unrest',
                authorId: '34c045ce-cd8a-4ff7-a9fe-2bff4289331d',
                imageId: 'b15947bf-26d5-45c9-aea2-f5d134725d5a',
            },
            {
                id: '38f3bd39-888d-4eb1-9ed1-955f553e4b4a',
                title: 'Light To The Hills',
                authorId: '12fbdc9c-6fa1-46cb-8f4b-e33b0373db91',
                imageId: 'f14dd092-50ea-4da6-b6e3-3b39a49648cf',
            },
            {
                id: 'e6dfaaec-d899-4fbc-8361-c17faee0cab2',
                title: 'Holly',
                authorId: 'b5c09148-c073-4bd4-909c-30ec51360377',
                imageId: '9b6449a4-e537-4bce-81a9-4937b0bf4824',
            },
        ],
    }),
    actions: {
        addBook(book) {
            this.list.push(book);
        },
        getBook(id) {
            return this.list.find((book) => book.id === id);
        },
        deleteBook(id) {
            this.list = this.list.filter((book) => book.id !== id);
        },
    },
});
