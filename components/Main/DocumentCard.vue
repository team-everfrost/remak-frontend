<template>
  <div
    class="flex w-full flex-shrink-0 flex-grow-0 flex-col items-start justify-start overflow-hidden rounded-2xl border border-[#e6e8eb] bg-[#fefefe] pb-4"
    :class="!imageUrl ? 'gap-0 pt-4' : 'gap-4 pt-0'"
    style="
      box-shadow:
        0px 0px 1px 0 rgba(65, 74, 82, 0.04),
        0px 2px 4px 0 rgba(102, 110, 119, 0.16);
    "
  >
    <div class="w-full bg-[#F4F6F8]">
      <svg
        v-if="imageUrl"
        width="258"
        height="160"
        viewBox="0 0 258 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-40 flex-shrink-0 flex-grow-0 mx-auto"
        preserveAspectRatio="none"
      >
        <rect width="258" height="160" fill="#F4F6F8"></rect>
        <path
          d="M104.7 75.0778V56.4539C104.7 55.2919 105.639 54.35 106.801 54.35H134.674C145.776 54.35 153.3 64.1811 153.3 73.39C153.3 80.7571 148.869 84.4725 145.498 88.3303L151.871 101.743C152.535 103.139 151.517 104.75 149.971 104.75H133.638C133.354 104.75 133.082 104.635 132.884 104.432L104.998 75.8119C104.807 75.6155 104.7 75.3521 104.7 75.0778Z"
          fill="#E0E0E0"
        ></path>
        <path
          d="M104.7 102.646V84.4198C104.7 83.9512 105.267 83.7166 105.598 84.0479L125.402 103.852C125.733 104.183 125.499 104.75 125.03 104.75H106.804C105.642 104.75 104.7 103.808 104.7 102.646Z"
          fill="#E0E0E0"
        ></path>
      </svg>
    </div>
    <div
      class="flex flex-shrink-0 flex-grow-1 flex-col items-start justify-start gap-5 px-3.5"
    >
      <div
        class="flex flex-shrink-0 flex-grow-1 flex-col items-start justify-start gap-3"
      >
        <p
          class="line-clamp-2 flex-shrink-1 flex-grow-1 text-left text-base font-bold text-[#111]"
        >
          {{ title }}
        </p>
        <p
          class="line-clamp-3 flex-shrink-0 flex-grow-1 text-left text-sm text-[#646f7c]"
        >
          <span
            class="flex-shrink-0 flex-grow-1 text-left text-sm text-[#646f7c]"
          >
            {{ summary }}
          </span>
        </p>
      </div>
      <div class="flex flex-shrink-0 flex-grow-1 items-end justify-start gap-2">
        <p class="flex-shrink-0 flex-grow-1 text-left text-xs text-[#646f7c]">
          {{ typeKorean }}
        </p>
        <div class="h-3 w-px flex-shrink-0 flex-grow-1 bg-[#646f7c]"></div>
        <p class="flex-shrink-0 flex-grow-1 text-left text-xs text-[#646f7c]">
          {{ date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string;
  imageUrl: string;
  url: string;
  title: string;
  summary: string;
  date: string;
}>();

const typeKorean = computed(() => {
  switch (props.type) {
    case 'MEMO':
      return '메모';
    case 'IMAGE':
      return '이미지';
    case 'WEBPAGE':
      return '링크';
    case 'FILE':
      return '파일';
    default:
      return '메모';
  }
});
</script>
