<script>
import CldImage from "@/components/CldImage.vue";

export default {
  name: "BookCard",
  components: { CldImage },
  emits: ['delete-book'],
  props: {
    book: {
      type: Object,
      required: true,
    },
    getAuthorName: {
      type: Function,
      required: true,
    },
    getImagePublicId: {
      type: Function,
      required: true,
    },
  },
  methods: {
    deleteBook() {
      this.$emit('delete-book', this.book);
    },
  },
};
</script>

<template>
  <article class="box">
    <div class="media">
      <aside class="media-left is-flex">
        <CldImage
            :publicId="getImagePublicId(book.imageId)"
            :alt="`${book.title}, a book release by ${getAuthorName(book.authorId)}.`" />
      </aside>

      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ book.title }}
        </p>

        <p class="subtitle mb-3">
          {{ getAuthorName(book.authorId) }}
        </p>

        <div>
          <button @click="deleteBook" class="button is-small is-danger is-light">Borrar</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
img {
  border-radius: 8px;
}
</style>