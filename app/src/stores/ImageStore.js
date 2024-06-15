import { defineStore } from "pinia";

export const useImageStore = defineStore('ImageStore', {
    state: () => ({
        list: [
            {
                id: 'b15947bf-26d5-45c9-aea2-f5d134725d5a',
                publicId: 'book_2_900x1500_cfwaai',
            },
            {
                id: 'f14dd092-50ea-4da6-b6e3-3b39a49648cf',
                publicId: 'book_5_900x1500_lmytuc',
            },
            {
                id: '9b6449a4-e537-4bce-81a9-4937b0bf4824',
                publicId: 'book_6_900x1500_xng2yc',
            },
        ],
    }),
    actions: {
        addImage(image) {
            this.list.push(image);
        },
        getImage(id) {
            return this.list.find((image) => image.id === id);
        },
        deleteImage(id) {
            this.list = this.list.filter((image) => image.id !== id);
        },
    },
});
