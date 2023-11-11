<template>
  <div class="flex flex-col">
    <div
      class="justify-center px-3 rounded-bl-xl rounded-br-xl rounded-tl-xl bg-[#1f8ce6] text-white"
    >
      <div class="max-w-96 my-5 whitespace-pre-wrap">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
