<template>
  <div
    class="flex grow min-h-[372px] w-full max-w-[480px] flex-col rounded-[20px] bg-white"
  >
    <div class="flex flex-row items-center justify-between pl-5 pr-4 pt-5">
      <p class="leading-18 text-lg font-bold text-[#1b1c1f]">메모</p>
      <button
        :disabled="isUploading"
        :class="isUploading ? 'cursor-not-allowed opacity-50' : ''"
        @click="emit('changeComponent', 'cancel')"
      >
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
      ref="textarea"
      placeholder="메모를 입력해주세요"
      :value="memo"
      maxlength="1000000"
      class="ml-5 mr-5 mt-8 grow resize-none self-stretch overflow-auto rounded-xl border border-[#e6e8eb] bg-[#fefefe] p-4 outline-none"
      @input="inputTextarea"
    ></textarea>

    <button
      :disabled="!memo"
      :class="
        hasError
          ? 'bg-[#f83a41] text-white'
          : !memo || isUploading
          ? 'bg-[#eee] text-[#C5C8CE]'
          : 'bg-[#1F8CE6] text-white'
      "
      class="mb-5 ml-5 mr-5 mt-6 flex h-[52px] flex-shrink-0 flex-grow-0 items-center justify-center self-stretch overflow-hidden rounded-xl bg-[#1f8ce6]"
      @click="handleClick"
    >
      <p
        class="flex-grow text-center text-lg font-bold"
        :class="hasError ? 'animate-shake' : ''"
      >
        {{ hasError ? '재시도' : '저장하기' }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAddStore } from '~/stores/add';

const addStore = useAddStore();
const memo = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);

const isUploading = ref(false);
const hasError = ref(false);

const emit = defineEmits<{
  (event: 'changeComponent', componentName: string): void;
  (event: 'isUploading', isUploading: boolean): void;
}>();

onMounted(() => {
  if (textarea.value) {
    textarea.value.focus();
  }
});

const inputTextarea = () => {
  if (textarea.value) {
    hasError.value = false;
    memo.value = textarea.value.value;
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 5 + 'px';
  }
};

useResizeObserver(textarea, () => {
  inputTextarea();
});

const handleClick = async () => {
  await saveMemo();
};

const saveMemo = async () => {
  if (!memo.value || isUploading.value) return;

  isUploading.value = true;
  emit('isUploading', isUploading.value);
  hasError.value = false;
  const result = await addStore.addMemo(memo.value);
  isUploading.value = false;
  emit('isUploading', isUploading.value);

  if (result) {
    emit('changeComponent', 'cancel');
  } else {
    hasError.value = true;
  }
};
</script>
