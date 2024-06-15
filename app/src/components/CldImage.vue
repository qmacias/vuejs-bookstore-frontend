<script setup>
import { AdvancedImage } from '@cloudinary/vue';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const props = defineProps({
  alt: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

const img = cld.image(props.publicId);

img.quality('auto').format('auto');
</script>

<template>
  <AdvancedImage
      :alt="alt"
      :cld-img="img"
      loading="lazy"
      style="max-height: 250px" />
</template>

<style scoped>
img {
  width: 100%;
}
</style>