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

      <div class="fixed inset-0">
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
                class="flex flex-col max-w-[480px] bg-white w-full h-full rounded-[20px]"
              >
                <div class="flex flex-row justify-between mt-5 mx-5">
                  <p class="text-lg font-bold">새 컬렉션 만들기</p>
                  <button @click="closeModal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 relative"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="#28323C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
                <p class="text-sm font-medium text-left ml-4 mt-10">
                  <span class="flex-grow-0 flex-shrink-0">컬렉션 이름 </span
                  ><span class="flex-grow-0 flex-shrink-0 text-[#f83a41]"
                    >*</span
                  >
                </p>
                <input
                  v-model="collectionName"
                  class="flex h-14 bg-[##FEFEFE] rounded-xl px-4 py-2 mt-3 items-center mx-4 resize-none outline-none border border-[#e6e8eb]"
                  placeholder="컬렉션 이름을 입력해주세요"
                />
                <p class="text-sm font-medium text-left ml-4 mt-4">
                  컬렉션 설명
                </p>
                <textarea
                  v-model="collectionDescription"
                  rows="3"
                  class="flex bg-[##FEFEFE] rounded-xl px-4 py-2 mt-3 items-center mx-4 resize-none outline-none border border-[#e6e8eb]"
                  placeholder="컬렉션 설명을 입력해주세요"
                ></textarea>
                <div class="flex-grow"></div>
                <button
                  :disabled="!collectionName"
                  :class="
                    !collectionName
                      ? 'bg-[#eee] text-[#C5C8CE]'
                      : 'bg-[#1F8CE6] text-white'
                  "
                  class="flex mx-4 mt-10 h-[52px] justify-center items-center rounded-xl text-lg font-bold text-center mb-5"
                  @click="handleClick"
                >
                  생성하기
                </button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { useCollectionStore } from '~/stores/collection';

const collectionStore = useCollectionStore();
const collectionName = ref('');
const collectionDescription = ref('');

const handleClick = async () => {
  await collectionStore.createCollection(
    collectionName.value,
    collectionDescription.value,
  );
  collectionName.value = '';
  collectionDescription.value = '';

  closeModal();
};

// Define the props
defineProps<{
  isOpen: boolean; // Change 'initialIsOpen' to 'isOpen'
}>();

// Define the emits
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void;
}>();

// Update the 'closeModal' function to emit the updated 'isOpen' value
const closeModal = () => {
  collectionName.value = '';
  collectionDescription.value = '';
  emit('update:isOpen', false);
};
</script>
