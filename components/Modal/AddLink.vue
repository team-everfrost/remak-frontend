<template>
  <div class="flex w-full max-w-[480px] flex-col rounded-[20px] bg-white">
    <div class="flex flex-row items-center justify-between pl-5 pr-3 pt-5">
      <p class="leading-18 text-lg font-bold text-[#1b1c1f]">추가하기</p>
      <button @click="emit('changeComponent', 'cancel')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="relative h-6 w-6"
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
    <textarea
      v-model="link"
      placeholder="예시: www.naver.com, www.google.com..."
      class="ml-4 mr-4 mt-8 h-[278px] flex-grow resize-none self-stretch overflow-auto rounded-xl border border-[#e6e8eb] bg-[#fefefe] p-4 outline-none"
      rows="1"
    ></textarea>
    <p class="ml-4 mr-4 mt-3 text-left text-sm text-[#646f7c]">
      엔터 또는 ,로 구분하여 여러 링크를 추가하세요
    </p>
    <button
      :disabled="!link"
      :class="!link ? 'bg-[#eee] text-[#C5C8CE]' : 'bg-[#1F8CE6] text-white'"
      class="mb-5 ml-5 mr-5 mt-6 flex h-[52px] flex-shrink-0 flex-grow-0 items-center justify-center self-stretch overflow-hidden rounded-xl bg-[#1f8ce6]"
      @click="handleClick"
    >
      <p class="flex-grow text-center text-lg font-bold">추가하기</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAddStore } from '~/stores/add';

const addStore = useAddStore();
const link = ref('');
const emit = defineEmits<{
  (event: 'changeComponent', componentName: string): void;
}>();
const handleClick = () => {
  const url = link.value.trim();
  const splitUrl = url.split(/\n|,/);
  const urlList = splitUrl.map((item) => item.trim());
  for (const i of urlList) {
    let url = i;
    if (!i.startsWith('http://') && !i.startsWith('https://')) {
      url = 'https://' + i;
      addStore.addLink(url);
      // Assuming the action is named 'createWebPage'
    } else {
      addStore.addLink(url);
      // Assuming the action is named 'createWebPage'
    }
  }
  emit('changeComponent', 'cancel');
};
</script>
