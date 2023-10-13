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
      <NuxtImg
        v-if="imageUrl"
        sizes="100vw"
        class="object-cover h-40 w-full mx-auto"
        :src="imageUrl"
        :alt="title || 'image placeholder'"
        placeholder="/images/imageHolder.svg"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col items-start justify-start gap-5 mx-3.5 break-all">
      <div class="flex flex-col items-start justify-start gap-3">
        <p class="line-clamp-2 text-left text-base font-bold text-[#111]">
          {{ title }}
        </p>
        <p class="line-clamp-3 text-left text-sm text-[#646f7c]">
          <span class="text-left text-sm text-[#646f7c]">
            {{ summary }}
          </span>
        </p>
      </div>
      <div class="flex items-end justify-start gap-2">
        <p class="text-left text-xs text-[#646f7c]">
          {{ typeKorean }}
        </p>
        <div class="h-3 w-px bg-[#646f7c]"></div>
        <p class="text-left text-xs text-[#646f7c]">
          {{ date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string;
  imageUrl: string | null;
  url: string;
  title: string | null;
  summary: string | null;
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
      return '';
  }
});
</script>
