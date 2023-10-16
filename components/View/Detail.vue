<template>
  <div
    class="flex items-center justify-center rounded-2xl border border-[#e6e8eb] bg-[#fefefe] px-10 pb-12 pt-10"
  >
    <div class="flex w-full flex-col justify-start">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start gap-2">
          <p class="text-left text-sm font-medium text-[#646f7c]">
            {{ typeKorean }}
          </p>
          <div class="h-3 w-px bg-[#646f7c]"></div>
          <p class="text-left text-sm font-medium text-[#646f7c]">{{ date }}</p>
          <div class="h-3 w-px bg-[#646f7c]"></div>
          <NuxtLink :to="props.document.url" target="_blank">
            <p class="text-left text-sm font-medium text-[#646f7c]">
              {{ props.document.url }}
            </p>
          </NuxtLink>
        </div>
        <button class="ml-auto">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <div
        v-if="props.document.type === 'IMAGE' || props.document.type === 'FILE'"
        class="flex mt-4 h-60 items-center justify-center gap-2.5 self-stretch rounded-xl border border-[#e6e8eb] bg-[#F4F6F8] cursor-pointer"
        :class="imageClick ? 'h-auto' : 'h-60'"
        @click="imageClick = !imageClick"
      >
        <img
          sizes="100vw"
          class="object-cover h-full w-full mx-auto"
          :src="props.document.thumbnailUrl"
          :alt="props.document.title || 'image placeholder'"
          placeholder="/assets/imageHolder.svg"
          onerror="this.onerror = null; this.src='/assets/imageHolder.svg'"
        />
      </div>
      <NuxtLink :to="props.document.url" target="_blank">
        <p class="text-left text-[28px] font-bold text-[#111] mt-4 mb-8">
          {{ props.document.title }}
        </p>
      </NuxtLink>
      <div
        v-if="props.document.tags"
        class="flex items-start justify-start gap-3"
      >
        <ViewTagList :tags="props.document.tags" />
      </div>
      <div v-if="props.document.type !== 'MEMO'">
        <p class="mt-9 mb-4 text-left text-base font-bold text-[#28323c]">
          요약
        </p>
        <div
          class="flex items-start justify-start gap-2.5 self-stretch rounded-xl border border-[#e6e8eb] bg-[#fefefe] px-4 py-5"
        >
          <p class="flex-grow text-left text-sm font-medium text-[#111]">
            {{ summary }}
          </p>
        </div>
      </div>
      <div v-if="props.document.type === 'WEBPAGE'">
        <p
          class="mt-6 mb-4 flex-shrink-0 flex-grow-0 text-left text-base font-bold text-[#28323c]"
        >
          본문
        </p>
        <div
          v-dompurify-html="content"
          class="prose md:prose-lg lg:prose-xl max-w-none"
        ></div>
      </div>
      <div v-if="props.document.type === 'MEMO'">
        <textarea
          ref="textarea"
          placeholder="메모를 입력하세요"
          class="mt-8 w-full rounded-xl border border-[#e6e8eb] bg-[#F4F6F8] p-4 outline-none resize-none"
          rows="6"
          maxlength="1000000"
          :value="props.document.content"
          @input="resizeTextarea"
          @change="changeTextarea"
        ></textarea>
      </div>
      <div
        v-if="props.document.type === 'FILE' || props.document.type === 'IMAGE'"
      >
        <button
          class="relative mt-12 flex flex-col h-[52px] w-full items-start justify-center overflow-hidden rounded-xl bg-[#1f8ce6]"
          @click="fileDownload"
        >
          <div
            class="h-full"
            :class="
              downloadBtnText === '다운로드 실패'
                ? 'bg-[#f83a41]'
                : progress
                ? 'bg-gradient-to-r from-emerald-500 from-60% to-bg-[#1f8ce6]'
                : 'bg-[#1f8ce6]'
            "
            :style="
              progress
                ? 'width: ' + progress.toString().padStart(2, '0') + '%'
                : 'width: 100%'
            "
          ></div>
          <span
            class="absolute w-full text-center text-lg font-bold text-white"
          >
            {{
              progress
                ? '다운로드 중...' + progress.toString().padStart(2, '0') + '%'
                : downloadBtnText
            }}
          </span>
        </button>
      </div>
      <div v-if="props.document.type === 'WEBPAGE'">
        <NuxtLink :to="props.document.url" target="_blank">
          <div
            class="mt-12 flex h-[52px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#1f8ce6]"
          >
            <p class="flex-grow text-center text-lg font-bold text-white">
              웹 페이지로 이동하기
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';
import hljs from 'highlight.js';
import { useDocumentStore } from '~/stores/document';

hljs.configure({
  ignoreUnescapedHTML: true,
});

const props = defineProps<{
  document: {
    docId: string;
    title: string;
    type: 'MEMO' | 'IMAGE' | 'WEBPAGE' | 'FILE';
    url: string;
    content: string;
    summary: string;
    status: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
    tags: [] | undefined;
  };
}>();

const documentStore = useDocumentStore();

const imageClick = ref(false);
const textarea = ref<HTMLTextAreaElement | null>(null);
const updatedText = ref('');
const progress = ref<number | null>(null);
const downloadBtnText = ref('다운로드');

const summary = computed(() => {
  if (props.document.type === 'MEMO')
    return props.document.content.split('\n')[1] ?? '';
  if (props.document.type === 'IMAGE') {
    switch (props.document.status) {
      case 'EMBED_PENDING':
        return 'AI가 곧 이미지를 분석할거에요.';
      case 'EMBED_PROCESSING':
        return 'AI가 이미지를 분석중이에요!';
      case 'EMBED_REJECTED':
        return 'AI가 이미지 분석에 실패했어요.';
      default:
        return props.document.summary?.split('\n')[1] ?? '';
    }
  }
  switch (props.document.status) {
    case 'SCRAPE_PENDING':
      return '스크랩 대기중이에요.';
    case 'SCRAPE_PROCESSING':
      return '스크랩이 진행중이에요!';
    case 'SCRAPE_REJECTED':
      return '스크랩에 실패했어요.';
    case 'EMBED_PENDING':
      return 'AI가 곧 자료를 요약할거에요.';
    case 'EMBED_PROCESSING':
      return 'AI가 자료를 요약중이에요!';
    case 'EMBED_REJECTED':
      return 'AI가 자료를 요약하지 못했어요.';
    default:
      return props.document.summary?.split('\n')[1] ?? '';
  }
});

const typeKorean = computed(() => {
  switch (props.document.type) {
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

const date = computed(() => {
  return new Date(Date.parse(props.document.updatedAt))
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/. /g, '.')
    .slice(0, -1);
});

const content = computed(() => {
  if (props.document.type === 'WEBPAGE') {
    // DOM으로 변환
    const dom = new DOMParser().parseFromString(
      props.document.content,
      'text/html',
    );

    // 코드 하이라이팅
    dom.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });

    // 다시 문자열로 변환
    return dom.body.innerHTML;
  }
  return props.document.content;
});

const resizeTextarea = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 5 + 'px';
  }
};

useResizeObserver(textarea, () => {
  resizeTextarea();
});

const changeTextarea = () => {
  if (textarea.value) {
    updatedText.value = textarea.value.value;
  }
};

const fileDownload = async () => {
  if (progress.value) return;

  try {
    const signedUrl = await documentStore.fetchFileDownloadUrl(
      props.document.docId,
    );

    const response = await fetch(signedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentLength = response.headers.get('content-length');
    if (!contentLength) {
      throw new Error('Content Length response header is missing');
    }

    const totalLength = parseInt(contentLength, 10);
    let receivedLength = 0; // 받은 데이터의 길이

    const reader = response.body?.getReader() as ReadableStreamDefaultReader;
    const chunks = []; // 데이터 청크를 저장할 배열

    while (true) {
      const { done, value } = await reader.read(); // value는 Uint8Array입니다.

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      progress.value = Math.ceil((receivedLength / totalLength) * 100); // 진행 상황을 백분율로 업데이트
    }

    const blob = new Blob(chunks, { type: 'application/octet-stream' }); // 모든 청크를 하나의 Blob으로 병합
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = props.document.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    downloadBtnText.value = '다운로드 완료';
    progress.value = null; // 다운로드 완료 후 진행 상황을 리셋
  } catch (error) {
    downloadBtnText.value = '다운로드 실패';
    progress.value = null; // 에러 발생 시 진행 상황을 리셋
  }
};

onMounted(() => {
  if (props.document.type === 'MEMO' && textarea.value) {
    textarea.value.value = props.document.content;
    updatedText.value = props.document.content;
    resizeTextarea();
  }
});
</script>
