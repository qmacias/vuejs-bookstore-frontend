<script setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  authors: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add-new-book', 'cancel-new-book'])

const newBook = ref({
  id: uuidv4(),
  title: '',
  authorId: '',
  bookCover: '',
})

const bookCoverUrl = ref('')

const openUploadWidget = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  const processResults = (error, result) => {
    if (result.event === 'success') {
      bookCoverUrl.value = result.info.secure_url
      newBook.value.bookCover = result.info.public_id
    }
  }

  window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url'],
        clientAllowedFormats: ['image'],
        resourceType: 'image'
      },
      processResults
  )
}

onMounted(() => {
  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', 'uw')
  script.src = 'https://upload-widget.cloudinary.com/global/all.js'
  script.onerror = () => {
    console.error('Failed to load third-party script.')
  }
  document.head.appendChild(script)
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Título</label>

        <div class="control">
          <input
              v-model="newBook.title"
              type="text"
              class="input is-medium"
              placeholder="Alice in Wonderland"
              required
          />
        </div>
      </div>

      <div class="field mb-5">
        <label for="author" class="label">Autor</label>

        <div class="select">
          <select v-model="newBook.authorId" id="author">
            <option value="" selected>Seleccionar...</option>

            <option v-for="author in props.authors" :value="author.id" :key="`option-${author.id}`">
              {{ author.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field mb-5">
        <label for="bookCover" class="label">Imagen</label>

        <button class="button is-info" @click="openUploadWidget">Subir imagen</button>

        <div v-if="bookCoverUrl" class="mt-4">
          <img :src="bookCoverUrl" alt="Book Cover" class="book-cover-image" />
        </div>
      </div>

      <div class="field">
        <div class="buttons">
          <button class="button is-success" @click="emit('add-new-book', newBook)">Guardar</button>

          <button class="button is-light" @click="emit('cancel-new-book')">Cancelar</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.book-cover-image {
  max-width: 200px;
  max-height: 300px;
}
</style>