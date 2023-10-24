<template>
  <div v-auto-animate class="relative">
    <NuxtLink :to="`/view/${docId}`" class="cursor-pointer">
      <div
        class="flex w-full flex-col items-start justify-start overflow-hidden rounded-2xl border border-[#e6e8eb] bg-[#fefefe] pb-4"
        :class="type === 'MEMO' ? 'gap-0 pt-4' : 'gap-4 pt-0'"
        style="
          box-shadow:
            0px 0px 1px 0 rgba(65, 74, 82, 0.04),
            0px 2px 4px 0 rgba(102, 110, 119, 0.16);
        "
      >
        <div class="w-full bg-[#F4F6F8] rounded-t-2xl">
          <img
            v-if="type !== 'MEMO'"
            sizes="100vw"
            class="object-cover h-40 w-full mx-auto"
            :src="imageUrl || '/image/imageHolder.svg'"
            :alt="title || 'image placeholder'"
            placeholder="~/assets/imageHolder.svg"
            loading="lazy"
            onerror="this.onerror = null; this.src = '/image/imageHolder.svg';"
          />
          <!-- 이미지 로딩 실패시 대체 이미지 경로 문제로 public에 지정 -->
        </div>
        <div
          class="flex flex-col items-start justify-start gap-5 mx-3.5 break-all"
        >
          <div class="flex flex-col items-start justify-start gap-3">
            <p
              class="line-clamp-2 text-left text-base font-bold text-[#111] transition-all ease-in-out"
              :class="type === 'MEMO' && selectMode ? 'ml-8 -mr-8' : ''"
            >
              {{ title }}
            </p>
            <p class="line-clamp-3 text-left text-sm text-[#646f7c]">
              <span
                class="text-left text-sm text-[#646f7c] whitespace-pre-line"
              >
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
              {{ info }}
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>
    <div
      v-if="selectMode"
      class="absolute top-0 left-0 w-full h-full rounded-2xl"
      @click="setSelected"
    >
      <div
        v-show="!isSelected"
        class="ml-4 mt-5 w-5 h-5 rounded-full border-2 border-stone-300"
      ></div>
      <div v-show="isSelected" class="ml-4 mt-5 w-5 h-5 rounded-full">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Property 1=Variant2">
            <rect x="1" y="1" width="18" height="18" rx="9" fill="#1F8CE6" />
            <path
              id="Vector"
              d="M7 10L9 12L13 8"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx="9"
              stroke="#1F8CE6"
              stroke-width="2"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectMode: boolean;
  docId: string | null;
  type: string;
  imageUrl: string | null;
  title: string | null;
  summary: string | null;
  info: string;
}>();

const isSelected = ref(false);

watch(
  () => props.selectMode,
  () => {
    isSelected.value = false;
  },
);

const emit = defineEmits<{
  (e: 'isSelected', value: boolean): void;
}>();

const setSelected = () => {
  isSelected.value = !isSelected.value;
  emit('isSelected', isSelected.value);
};

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
