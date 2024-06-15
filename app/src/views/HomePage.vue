<script>
export default {
  name: "HomePage",
};
</script>

<template>
  <main>
    <section class="hero is-fullheight is-default is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <figure class="image is-2by1">
                <img src="https://picsum.photos/800/600/?random" alt="Imagen generada de forma aleatoria.">
              </figure>
            </div>

            <div class="column is-6 is-offset-1">
              <h1 class="title is-3">
                ¡Bienvenido! Te estábamos esperando
              </h1>

              <h2 class="subtitle is-4">
                Añade nuevos libros o modifica los registros de tu preferencia
              </h2>

              <div class="is-flex is-align-items-center is-justify-content-center">
                <p class="buttons">
                  <RouterLink to="/books" class="button is-primary">Ver todos los libros</RouterLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>