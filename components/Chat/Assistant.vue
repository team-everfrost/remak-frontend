<template>
  <div class="flex flex-col">
    <p class="text-lg font-medium mb-2">Remak</p>
    <div
      class="justify-center rounded-tr-xl px-3 rounded-bl-xl rounded-br-xl border"
      :class="
        hasError
          ? 'bg-red-100 border-[#ff0000]'
          : 'bg-[#fefefe] border-[#e6e8eb]'
      "
    >
      <div class="prose max-w-96">
        <Markdown :source="text" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  hasError?: boolean;
}>();
</script>
