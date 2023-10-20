<template>
  <div class="flex w-full justify-center flex-col items-center">
    <img src="~/assets/empty_box.svg" alt="빈 박스" />
    <p class="text-lg text-center text-[#646f7c] mt-6">{{ discription }}</p>
    <button
      v-if="open"
      class="flex justify-center items-center px-7 py-4 rounded-xl border border-[#e6e8eb] bg-white mt-4"
      @click="open"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  discription: string;
  buttonText?: string;
  open?: (() => void) | null | undefined;
}>();
</script>
