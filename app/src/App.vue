<script>
export default {
  name: 'App',
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      images: [],
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    },
    async uploadImage() {
      const publicId = 'f7c79586-5a1e-4e11-8b19-ee7ce595d7d6'; // Autogenerado más tarde

      try {
        const response = await fetch(`http://127.0.0.1:5000/images/${publicId}`, {
          method: 'PUT',
          body: this.selectedFile,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          this.images.push(data);
          this.selectedFile = null;
          this.previewUrl = null;
        } else {
          console.error('Error al subir la imagen');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchImages() {
      try {
        const response = await fetch('http://127.0.0.1:5000/images');
        const data = await response.json();
        this.images = data.images;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteImage(publicId) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/images/${publicId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.fetchImages();
        } else {
          console.error('Error al eliminar la imagen');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchImages();
  },
};
</script>

<template>
  <div id="app">
    <div>
      <input type="file" @change="onFileSelected" accept="image/*"/>
      <button @click="uploadImage" :disabled="!selectedFile">Cargar imagen</button>
      <div v-if="previewUrl">
        <p>Vista previa:</p>
        <img :src="previewUrl" style="max-width: 300px;"/>
      </div>
    </div>

    <div v-if="images.length > 0">
      <h3>Imágenes cargadas:</h3>
      <div v-for="image in images" :key="image.public_id">
        <img :src="image.secure_url" style="max-width: 300px;"/>
        <button @click="deleteImage(image.public_id)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<style>

</style>