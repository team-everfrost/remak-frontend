<template>
  <div>
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
    <button
      class="relative ml-4 mr-4 mt-10 flex w-[448px] items-center justify-between"
      @click="$emit('changeComponent', 'link')"
    >
      <div
        class="relative flex flex-shrink-0 flex-grow-0 items-center justify-start gap-3"
      >
        <img src="~/assets/icons/icon_add_link.svg" alt="링크 추가" />
        <div
          class="relative flex flex-shrink-0 flex-grow-0 flex-col items-start justify-start gap-1"
        >
          <p class="flex-grow0 flex-shrink-0 text-left text-sm font-bold">
            링크
          </p>
          <p class="flex-shrink-0 flex-grow-0 text-left text-sm text-[#646f7c]">
            다시 보고싶은 페이지를 저장할 수 있어요
          </p>
        </div>
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="relative h-5 w-5 flex-shrink-0 flex-grow-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="#28323C"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>

    <button
      class="relative ml-4 mr-4 mt-6 flex w-[448px] items-center justify-between"
    >
      <div
        class="relative flex flex-shrink-0 flex-grow-0 items-center justify-start gap-3"
      >
        <img src="~/assets/icons/icon_add_file.svg" alt="파일 추가" />
        <div
          class="relative flex flex-shrink-0 flex-grow-0 flex-col items-start justify-start gap-1"
        >
          <p class="flex-grow0 flex-shrink-0 text-left text-sm font-bold">
            파일
          </p>
          <p class="flex-shrink-0 flex-grow-0 text-left text-sm text-[#646f7c]">
            pdf, txt의 요약을 지원해요
          </p>
        </div>
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="relative h-5 w-5 flex-shrink-0 flex-grow-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="#28323C"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>

    <button
      class="relative ml-4 mr-4 mt-6 flex w-[448px] items-center justify-between"
    >
      <div
        class="relative flex flex-shrink-0 flex-grow-0 items-center justify-start gap-3"
      >
        <img src="~/assets/icons/icon_add_photo.svg" alt="링크 추가" />
        <div
          class="relative flex flex-shrink-0 flex-grow-0 flex-col items-start justify-start gap-1"
        >
          <p class="flex-grow0 flex-shrink-0 text-left text-sm font-bold">
            사진
          </p>
          <p class="flex-shrink-0 flex-grow-0 text-left text-sm text-[#646f7c]">
            jpg, png, gif 등을 지원해요
          </p>
        </div>
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="relative h-5 w-5 flex-shrink-0 flex-grow-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="#28323C"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>

    <button
      class="relative mb-6 ml-4 mr-4 mt-6 flex w-[448px] items-center justify-between"
    >
      <div
        class="relative flex flex-shrink-0 flex-grow-0 items-center justify-start gap-3"
      >
        <img src="~/assets/icons/icon_add_memo.svg" alt="링크 추가" />
        <div
          class="relative flex flex-shrink-0 flex-grow-0 flex-col items-start justify-start gap-1"
        >
          <p class="flex-grow0 flex-shrink-0 text-left text-sm font-bold">
            메모
          </p>
          <p class="flex-shrink-0 flex-grow-0 text-left text-sm text-[#646f7c]">
            간단한 메모를 작성할 수 있어요
          </p>
        </div>
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="relative h-5 w-5 flex-shrink-0 flex-grow-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="#28323C"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'changeComponent', componentName: string): void;
}>();
</script>
