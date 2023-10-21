<template>
  <div
    class="relative flex min-h-[372px] w-[480px] flex-col rounded-[20px] bg-white"
  >
    <div class="flex flex-row items-center justify-between pl-5 pr-4 pt-5">
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
    <div
      class="ml-5 mr-5 mt-8 flex shrink-0 flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#e6e8eb] bg-[#fefefe] p-2.5"
    >
      <div
        class="relative flex flex-shrink-0 flex-col items-center justify-start gap-4"
      >
        <img
          src="~/assets/icons/icon_add_file_without_border.svg"
          alt="파일 추가"
        />
        <div
          class="relative flex flex-shrink-0 flex-grow-0 flex-col items-center justify-start gap-4"
        >
          <p
            class="flex-shrink-0 flex-grow-0 text-left text-base text-[#28323c]"
          >
            파일을 드래그 해보세요
          </p>
          <p class="flex-shrink-0 flex-grow-0 text-left text-sm text-[#646f7c]">
            pdf, txt와 이미지 파일을 한번에 10개까지 업로드 할 수 있어요
          </p>
        </div>
        <button
          class="relative flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2 rounded-lg border border-[#e6e8eb] bg-[#fefefe] px-2.5 py-1.5"
          @click="open()"
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="relative h-5 w-5 flex-shrink-0 flex-grow-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M10.5003 4.16667V15.8333M4.66699 10H16.3337"
              stroke="#28323C"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <p
            class="flex-shrink-0 flex-grow-0 text-center text-sm font-medium text-[#111]"
          >
            파일 등록하기
          </p>
        </button>
      </div>
    </div>
    <div
      v-if="filesInfo && filesInfo.length > 0"
      class="relative ml-5 mt-4 mr-5 flex flex-shrink-0 grow items-center justify-between rounded py-3"
    >
      <div
        v-for="file in filesInfo"
        :key="file.name"
        class="gap-2 flex flex-row"
      >
        <p
          class="flex-shrink-0 flex-grow-0 text-left text-sm font-bold text-[#28323c]"
        >
          {{ file.name }} ({{ file.size }}) {{ file.type }}
        </p>
        <button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="relative h-5 w-5 flex-shrink-0 flex-grow-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M15 5L5 15L15 5Z" fill="#28323C"></path>
            <path d="M5 5L15 15L5 5Z" fill="#28323C"></path>
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#28323C"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <button
      class="relative mb-5 ml-5 mr-5 mt-6 flex h-[52px] flex-shrink-0 flex-grow-0 items-center justify-center self-stretch overflow-hidden rounded-xl bg-[#1f8ce6]"
    >
      <p class="flex-grow text-center text-lg font-bold text-white">추가하기</p>
    </button>
  </div>
</template>

<script setup lang="ts">
const filesInfo = ref<
  [
    {
      name: string;
      size: number;
      type: string;
    },
  ]
>();

const emit = defineEmits<{
  (event: 'changeComponent', componentName: string): void;
}>();
</script>
