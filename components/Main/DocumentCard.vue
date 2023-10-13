<template>
  <div
    class="flex w-full flex-col items-start justify-start overflow-hidden rounded-2xl border border-[#e6e8eb] bg-[#fefefe] pb-4"
    :class="!imageUrl ? 'gap-0 pt-4' : 'gap-4 pt-0'"
    style="
      box-shadow:
        0px 0px 1px 0 rgba(65, 74, 82, 0.04),
        0px 2px 4px 0 rgba(102, 110, 119, 0.16);
    "
  >
    <div class="w-full bg-[#F4F6F8]">
      <img
        v-if="imageUrl"
        class="h-40 mx-auto"
        src="~/assets/imageHolder.svg"
        alt="image placeholder"
      />
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
