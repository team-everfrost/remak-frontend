<template>
  <div>
    <VuePdfEmbed :source="pdfUrl" :scale="2" :text-layer="true" />
  </div>
</template>

<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed';
defineComponent({ components: { VuePdfEmbed } });

defineProps<{
  pdfUrl: string;
}>();
</script>
