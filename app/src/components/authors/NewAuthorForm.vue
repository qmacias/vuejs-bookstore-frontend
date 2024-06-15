<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "NewBookForm",
  emits: ['add-new-author', 'cancel-new-author'],
  data: () => ({
    newAuthor: {
      id: uuidv4(),
      name: '',
    },
  }),
};
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Nombre</label>

        <div class="control">
          <input class="input is-large" required
                 type="text" placeholder="John Doe" v-model="newAuthor.name">
        </div>
      </div>

      <div class="field">
        <div class="buttons">
          <button class="button is-success"
                  @click="$emit('add-new-author', newAuthor)">Guardar</button>

          <button class="button is-light" @click="$emit('cancel-new-author')">Cancelar</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>