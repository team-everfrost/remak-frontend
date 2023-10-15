<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-[480px] max-h-[480px] bg-white w-full h-full rounded-[20px]"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="flex flex-row justify-between mt-5 mx-5">
      <p class="text-lg font-bold">새 컬렉션 만들기</p>
      <button @click="emit('cancel')">
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
      ><span class="flex-grow-0 flex-shrink-0 text-[#f83a41]">*</span>
    </p>
    <textarea
      v-model="collectionName"
      class="flex h-full max-h-14 bg-[#f4f6f8] rounded-xl px-4 py-2 mt-3 items-center mx-4 resize-none outline-none border border-[#e6e8eb]"
      placeholder="컬렉션 이름을 입력해주세요"
    ></textarea>
    <p class="text-sm font-medium text-left ml-4 mt-4">컬렉션 설명</p>
    <textarea
      v-model="collectionDescription"
      class="flex h-full max-h-20 bg-[#f4f6f8] rounded-xl px-4 py-2 mt-3 items-center mx-4 resize-none outline-none border border-[#e6e8eb]"
      placeholder="컬렉션 설명을 입력해주세요"
    ></textarea>
    <div class="flex-grow"></div>
    <button
      :disabled="!collectionName"
      :class="
        !collectionName ? 'bg-[#eee] text-[#C5C8CE]' : 'bg-[#1F8CE6] text-white'
      "
      class="flex mx-4 h-[52px] justify-center items-center rounded-xl text-lg font-bold text-center mb-5"
      @click="handleClick"
    >
      생성하기
    </button>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useCollectionStore } from '~/stores/collection';

const collectionStore = useCollectionStore();

const emit = defineEmits<{
  (e: 'cancel' | 'confirm'): void;
}>();
const collectionName = ref('');
const collectionDescription = ref('');

const handleClick = () => {
  collectionStore.createCollection(
    collectionName.value,
    collectionDescription.value,
  );
  emit('confirm');
};
</script>
