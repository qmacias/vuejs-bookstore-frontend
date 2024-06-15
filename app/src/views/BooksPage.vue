<script>
import { v4 as uuidv4 } from "uuid";
import { useAuthorStore, useBookStore, useImageStore } from "@/stores";

import BookCard from "@/components/books/BookCard.vue";
import NewBookForm from "@/components/books/NewBookForm.vue";
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: "BooksPage",
  components: {
    BookCard,
    NewBookForm,
    SideMenu,
  },
  setup() {
    const authorStore = useAuthorStore();
    const bookStore = useBookStore();
    const imageStore = useImageStore();

    return { authorStore, bookStore, imageStore };
  },
  data: () => ({
    filterText: '',
    showNewForm: false,
  }),
  computed: {
    filteredBookList() {
      return this.bookStore.list.filter((book) => {
        if (book.title) {
          return book.title.toLowerCase().includes(this.filterText.toLowerCase());
        } else {
          return this.bookStore.list;
        }
      })
    },
    numberOfBooks() {
      return this.filteredBookList.length;
    },
  },
  methods: {
    addBook(payload) {
      const newImage = {
        id: uuidv4(),
        publicId: payload.bookCover,
      }

      this.imageStore.addImage(newImage);
      const savedImage = this.imageStore.getImage(newImage.id);

      const newBookWithImageId = {
        id: payload.id,
        title: payload.title,
        authorId: payload.authorId,
        imageId: savedImage.id,
      }

      this.bookStore.addBook(newBookWithImageId);

      this.hideForm();
    },
    deleteBook(payload) {
      this.bookStore.deleteBook(payload.id);
      this.imageStore.deleteImage(payload.imageId);
    },
    getAuthorName(authorId) {
      const author = this.authorStore.getAuthor(authorId);

      return author.name;
    },
    getImagePublicId(imageId) {
      const image = this.imageStore.getImage(imageId);

      return image.publicId;
    },
    hideForm() {
      this.showNewForm = false;
    },
  },
  mounted() {
    const route = this.$route;

    if (route.query.new) {
      this.showNewForm = true;
    }
  },
};
</script>

<template>
  <main class="section">
    <div class="columns">
      <SideMenu />

      <div class="column">
        <h1 class="title">Libros</h1>

        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfBooks }}</strong> libros
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">Nuevo</button>
            </p>

            <p class="control">
              <input class="input" type="text" placeholder="Buscar" v-model="filterText" />
            </p>
          </div>
        </nav>

        <NewBookForm v-if="showNewForm" :authors="authorStore.list" @add-new-book="addBook" @cancel-new-book="hideForm" />

        <div v-else class="columns is-multiline">
          <div v-for="item in filteredBookList" class="column is-full" :key="`item-${item}`">
            <BookCard :book="item" @delete-book="deleteBook" :getImagePublicId="getImagePublicId" :getAuthorName="getAuthorName" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>