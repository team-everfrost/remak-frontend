<template>
  <div class="flex w-full max-w-[480px] flex-col rounded-[20px] bg-white">
    <div class="flex flex-row items-center justify-between pl-5 pr-3 pt-5">
      <p class="leading-18 text-lg font-bold text-[#1b1c1f]">메모</p>
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
      placeholder="메모를 입력해주세요"
      class="ml-4 mr-4 mt-8 h-[278px] flex-grow resize-none self-stretch overflow-auto rounded-xl border border-[#e6e8eb] bg-[#fefefe] p-4 outline-none"
      rows="1"
    ></textarea>

    <button
      class="mb-5 ml-5 mr-5 mt-6 flex h-[52px] flex-shrink-0 flex-grow-0 items-center justify-center self-stretch overflow-hidden rounded-xl bg-[#1f8ce6]"
    >
      <p class="flex-grow text-center text-lg font-bold text-white">저장하기</p>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'changeComponent', componentName: string): void;
}>();
</script>
