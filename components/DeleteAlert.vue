<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col items-center justify-center gap-6 rounded-[20px] bg-[#fefefe] px-4 pb-4 pt-6"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div
      class="relative flex flex-shrink-0 flex-grow-0 flex-col items-center justify-start gap-2 self-stretch"
    >
      <p
        class="w-[448px] flex-shrink-0 flex-grow-0 self-stretch text-center text-lg font-bold text-[#1b1c1f]"
      >
        {{ modalTitle }}
      </p>
      <p
        class="w-[448px] flex-shrink-0 flex-grow-0 self-stretch text-center text-sm text-[#757779]"
      >
        {{ modalSubtitle }}
      </p>
    </div>
    <div
      class="flex flex-shrink-0 flex-grow-0 items-start justify-start gap-3 self-stretch"
    >
      <button
        class="relative flex h-[52px] flex-grow items-center justify-center overflow-hidden rounded-xl bg-[#f4f6f8] px-2 py-4 font-bold"
        @click="emit('cancel')"
      >
        {{ cancelButtonText }}
      </button>
      <button
        class="relative flex h-[52px] flex-grow items-center justify-center overflow-hidden rounded-xl bg-[#F83A41] px-2 py-4 font-bold text-white"
        @click="emit('confirm')"
      >
        {{ confirmButtonText }}
      </button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
const emit = defineEmits<{
  (e: 'cancel' | 'confirm'): void;
}>();

const { modalTitle, modalSubtitle, cancelButtonText, confirmButtonText } =
  defineProps<{
    modalTitle: string;
    modalSubtitle: string;
    cancelButtonText: string;
    confirmButtonText: string;
  }>();
</script>
