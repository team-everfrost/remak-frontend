<template>
  <div
    class="flex grow min-h-[372px] w-full max-w-[480px] flex-col rounded-[20px] bg-white"
  >
    <div class="flex flex-row items-center justify-between pl-5 pr-4 pt-5">
      <p class="leading-18 text-lg font-bold text-[#1b1c1f]">추가하기</p>
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
      :value="link"
      :disabled="isUploading"
      maxlength="1000000"
      placeholder="www.naver.com, www.google.com..."
      class="ml-5 mr-5 mt-8 flex-grow resize-none self-stretch overflow-auto rounded-xl border border-[#e6e8eb] bg-[#fefefe] p-4 outline-none"
      @input="inputTextarea"
      @paste="pasteTextarea"
      @keydown.meta.s.prevent
      @keydown.ctrl.s.prevent
      @keydown.meta.s="handleClick"
      @keydown.ctrl.s="handleClick"
      @keydown.meta.enter="handleClick"
      @keydown.ctrl.enter="handleClick"
    ></textarea>
    <p class="ml-5 mr-5 mt-3 text-left text-sm text-[#646f7c]">
      엔터 또는 공백으로 구분하여 여러 링크를 추가할 수 있어요
    </p>
    <button
      :disabled="!hasUrl || isUploading"
      class="relative mb-5 ml-5 mr-5 mt-6 flex flex-col h-[52px] flex-shrink-0 flex-grow-0 items-start justify-center self-stretch overflow-hidden rounded-xl bg-[#1f8ce6]"
      @click="handleClick"
    >
      <div
        class="h-full"
        :class="
          hasError
            ? 'bg-[#f83a41]'
            : isUploading
            ? 'bg-gradient-to-r from-emerald-500 from-60% to-bg-[#1f8ce4]'
            : !hasUrl || isUploading
            ? 'bg-[#eee] text-[#C5C8CE]'
            : 'bg-[#1F8CE6] text-white'
        "
        :style="
          progress
            ? 'width: ' + progress.toString().padStart(2, '0') + '%'
            : 'width:100%'
        "
      ></div>
      <p
        class="absolute w-full flex-grow text-center text-lg font-bold"
        :class="
          hasError
            ? 'animate-shake text-white'
            : !hasUrl
            ? 'text-[#C5C8CE]'
            : 'text-white'
        "
      >
        {{
          isUploading
            ? '저장 중...' + progress.toString().padStart(2, '0') + '%'
            : hasError
            ? '실패 링크 재시도'
            : '저장하기'
        }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAddStore } from '~/stores/add';

const addStore = useAddStore();
const link = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);
const textareaObserver = ref<ResizeObserver | null>(null);

const isUploading = ref(false);
const progress = ref(0);
const hasError = ref(false);

const hasUrl = computed(() => {
  const url = link.value.trim();
  const splitUrl = url.split(/\n|\s/);
  const urlList = splitUrl.map((item) => item.trim()).filter(checkUrl);
  return urlList.length > 0;
});

const checkUrl = (url: string) => {
  // TODO: url이 () [] "" ''로 감싸진 경우 처리

  // http: 또는 https:로 시작하거나 도메인만
  const regex = /^(?:(?:https?):\/\/)?(?:[\S]+\.+[\S]+)(?:\/[^\s]*)?$/i;

  return regex.test(url) ? url : false;
};

onMounted(() => {
  if (textarea.value) {
    textarea.value.focus();
  }
  setResizeObserver();
});

onActivated(() => {
  setResizeObserver();
});

onDeactivated(() => {
  unsetResizeObserver();
});

onUnmounted(() => {
  unsetResizeObserver();
});

const setResizeObserver = () => {
  if (!textareaObserver.value)
    textareaObserver.value = new ResizeObserver(() => {
      if (textarea.value) {
        inputTextarea();
      }
    });

  if (textarea.value) textareaObserver.value?.observe(textarea.value);
};

const unsetResizeObserver = () => {
  if (textarea.value) textareaObserver.value?.unobserve(textarea.value);
};

const emit = defineEmits<{
  (event: 'changeComponent', componentName: string): void;
  (event: 'isUploading', isUploading: boolean): void;
}>();

const inputTextarea = () => {
  if (textarea.value) {
    hasError.value = false;
    link.value = textarea.value.value;
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 5 + 'px';
  }
};

const pasteTextarea = (e: ClipboardEvent) => {
  if (e.clipboardData) {
    e.preventDefault();

    // clipboardData가 있는지 확인
    // 클립보드에서 텍스트 데이터를 가져옵니다.
    const pastedText = e.clipboardData.getData('text');

    // 텍스트를 분할하고, 유효한 URL만 필터링합니다.
    const splitText = pastedText.split(/\n|\s/);
    const urlList = splitText.map((item) => item.trim()).filter(checkUrl);

    // 필터링된 URL을 공백으로 구분하여 합칩니다.
    if (textarea.value) textarea.value.value = urlList.join('\n');
  }
  inputTextarea();
};

const handleClick = async () => {
  await saveLink();
};

const saveLink = async () => {
  if (!hasUrl.value || isUploading.value) return;

  isUploading.value = true;
  hasError.value = false;
  emit('isUploading', isUploading.value);

  const url = link.value.trim();
  const splitUrl = url.split(/\n|\s/);
  const urlList = splitUrl.map((item) => item.trim()).filter(checkUrl);

  const totalProgress = urlList.length;
  let currentProgress = 0;

  const failedUrlList = [];
  for (const i of urlList) {
    let url = i;
    if (!i.startsWith('http:') && !i.startsWith('https:')) {
      url = 'http://' + i;
      const result = await addStore.addLink(url);
      if (!result) {
        failedUrlList.push(i);
      }
    } else {
      const result = await addStore.addLink(url);
      if (!result) {
        failedUrlList.push(i);
      }
    }

    currentProgress++;
    progress.value = Math.floor((currentProgress / totalProgress) * 100);
  }

  isUploading.value = false;
  emit('isUploading', isUploading.value);
  progress.value = 0;

  if (failedUrlList.length) {
    if (textarea.value) textarea.value.value = failedUrlList.join('\n');
    inputTextarea();
    hasError.value = true;
  } else {
    emit('changeComponent', 'cancel');
  }
};
</script>
