<template>
  <HeadlessTransitionRoot appear :show="isOpen" as="template">
    <HeadlessDialog as="div" class="relative z-50" @close="closeModal">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-[480px] max-h-[480px] h-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <div
                class="flex flex-col items-center justify-center gap-6 rounded-[20px] bg-[#fefefe] px-4 pb-4 pt-6"
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
                <div class="flex flex-shrink-0 flex-grow-0 gap-3 self-stretch">
                  <button
                    class="flex h-[52px] w-full items-center justify-center overflow-hidden rounded-xl bg-remak-blue text-white px-2 py-4 font-medium"
                    @click="handleConfirmClick"
                  >
                    확인
                  </button>
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
// Define the props
defineProps<{
  isOpen: boolean; // Change 'initialIsOpen' to 'isOpen'
  modalTitle: string;
  modalSubtitle: string;
}>();

const handleConfirmClick = () => {
  // Emit the 'confirm' event
  emit('confirm');
  closeModal();
};

// Define the emits
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void;
  (event: 'confirm'): void;
}>();

// Update the 'closeModal' function to emit the updated 'isOpen' value
const closeModal = () => {
  emit('update:isOpen', false);
};
</script>
