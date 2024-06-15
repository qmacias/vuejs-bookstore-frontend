<script>
import { useAuthorStore, useBookStore } from '@/stores';

import AuthorCard from "@/components/authors/AuthorCard.vue";
import NewAuthorForm from "@/components/authors/NewAuthorForm.vue";
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: "AuthorsPage",
  components: {
    AuthorCard,
    NewAuthorForm,
    SideMenu,
  },
  setup() {
    const authorStore = useAuthorStore();
    const bookStore = useBookStore();

    return { authorStore, bookStore };
  },
  data: () => ({
    filterText: '',
    showNewForm: false,
  }),
  computed: {
    filteredAuthorList() {
      return this.authorStore.list.filter((author) => {
        if (author.name) {
          return author.name.toLowerCase().includes(this.filterText.toLowerCase());
        } else {
          return this.authorStore.list;
        }
      })
    },
    numberOfAuthors() {
      return this.filteredAuthorList.length;
    },
  },
  methods: {
    addAuthor(payload) {
      this.authorStore.addAuthor(payload);

      this.hideForm();
    },
    deleteAuthor(payload) {
      for (const book of this.bookStore.list) {
        if (book.authorId === payload.id) {
          // Aquí tengo que eliminar libro con book.id
          // Aquí tengo que eliminar imagen con book.imageId
          // Para esto hay que usar la api de backend con Cloudinary
        }
      }

      this.authorStore.deleteAuthor(payload.id);
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
  <main>
    <section class="section">
      <div class="columns">
        <SideMenu />

        <div class="column">
          <h1 class="title">Autores</h1>

          <nav v-if="!showNewForm" class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-5">
                  <strong>{{ numberOfAuthors }}</strong> autores
                </p>
              </div>

              <p class="level-item">
                <button class="button is-success"
                        @click="showNewForm = true">Nuevo</button>
              </p>

              <p class="control">
                <input class="input" type="text" placeholder="Buscar" v-model="filterText">
              </p>
            </div>
          </nav>

          <NewAuthorForm v-if="showNewForm" @add-new-author="addAuthor" @cancel-new-author="hideForm" />

          <div v-else class="columns is-multiline">
            <div class="column is-full" v-for="item in filteredAuthorList" :key="`item-${item}`">
              <AuthorCard :author="item" @delete-author="deleteAuthor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>