<template>
  <div
    class="flex items-center justify-center rounded-2xl border border-[#e6e8eb] bg-[#fefefe] px-10 pb-12 pt-10"
  >
    <ModalDocumentInCollection
      :is-open="isCollectionModalOpen"
      :doc-id="[props.document.docId]"
      @update:is-open="handleCollectionIsOpenUpdate"
    />
    <DeleteAlert
      :is-open="isModalOpen"
      :modal-title="'정말 삭제하시겠어요?'"
      :modal-subtitle="'삭제시 복구가 불가능해요'"
      :cancel-button-text="'취소하기'"
      :confirm-button-text="'삭제하기'"
      @update:is-open="handleIsOpenUpdate"
      @confirm="handleConfirmClick"
    />
    <div v-auto-animate class="flex w-full flex-col justify-start">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start gap-2 pr-2">
          <p class="text-left text-sm font-medium text-[#646f7c] flex-shrink-0">
            {{ typeKorean }}
          </p>
          <div class="h-3 w-px bg-[#646f7c]"></div>
          <p class="text-left text-sm font-medium text-[#646f7c] flex-shrink-0">
            {{ date }}
          </p>
          <div class="h-3 w-px bg-[#646f7c]"></div>
          <NuxtLink
            :to="props.document.url"
            target="_blank"
            class="flex gap-2 items-center"
          >
            <p
              class="text-left text-sm font-medium text-[#646f7c] line-clamp-1"
            >
              {{
                props.document.type !== 'MEMO'
                  ? props.document.url
                  : updatedText.length + '자'
              }}
            </p>
            <svg
              v-if="props.document.type === 'WEBPAGE'"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              class="align-bottom shrink-0"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
              />
            </svg>
          </NuxtLink>
        </div>
        <HeadlessMenu as="div" class="relative inline-block text-left">
          <div>
            <HeadlessMenuButton>
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
            </HeadlessMenuButton>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <HeadlessMenuItems
              class="absolute right-0 mt-1 w-24 origin-top-right divide-yd bg-white rounded-xl border border-[#e6e8eb] shadow-lg outline-none"
            >
              <div class="py-">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-400 text-white' : 'text-gray-900',
                      'group flex w-full items-center justify-center rounded-t-md px-2 py-2 text-md border-t-0 border-r-0 border-b border-l-0 border-[#e6e8eb]',
                    ]"
                    @click="openCollectionModal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="-ml-2"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                      />
                    </svg>
                    컬렉션
                  </button>
                </HeadlessMenuItem>
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-400 text-white' : 'text-[#f83a41]',
                      'group flex w-full items-center justify-center rounded-b-md px-2 py-2 text-md font-medium ',
                    ]"
                    @click="openModal"
                  >
                    삭제
                  </button>
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </transition>
        </HeadlessMenu>
      </div>
      <div
        v-if="props.document.type !== 'MEMO'"
        class="flex mt-4 items-center justify-center gap-2.5 self-stretch rounded-xl border border-[#e6e8eb] bg-[#F4F6F8] cursor-pointer"
        :class="imageClick ? 'h-auto' : 'h-60'"
        @click="imageClick = !imageClick"
      >
        <img
          sizes="100vw"
          class="object-cover h-full w-full mx-auto rounded-xl"
          :src="props.document.thumbnailUrl || '/image/imageHolderDetail.svg'"
          :alt="props.document.title || 'image placeholder'"
          placeholder="~/assets/imageHolderDetail.svg"
          onerror="this.onerror = null; this.src = '/image/imageHolderDetail.svg';"
        />
      </div>
      <NuxtLink :to="props.document.url" target="_blank" class="inline-block">
        <h1
          class="text-left text-[28px] font-bold text-[#111] mt-4 mb-8"
          :class="
            props.document.type === 'MEMO' ? 'line-clamp-1' : 'inline-block'
          "
        >
          {{
            props.document.type !== 'MEMO'
              ? props.document.title
              : updatedText.split('\n')[0]
          }}
        </h1>
      </NuxtLink>
      <div
        v-if="props.document.tags"
        class="flex items-start justify-start gap-3"
      >
        <ViewTagList :tags="props.document.tags" />
      </div>
      <div v-if="props.document.type !== 'MEMO'">
        <p class="mt-9 mb-4 text-left text-lg font-bold text-[#28323c]">요약</p>
        <div
          class="flex items-start justify-start gap-2.5 self-stretch rounded-xl border border-[#e6e8eb] bg-[#fefefe] px-4 py-5"
        >
          <p
            class="flex-grow text-left text-md font-medium text-[#111] whitespace-pre-wrap"
          >
            {{ summary }}
          </p>
        </div>
      </div>
      <div v-if="props.document.type === 'WEBPAGE'">
        <p class="mt-6 mb-4 text-left text-lg font-bold text-[#28323c]">본문</p>
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
          :value="updatedText"
          @input="inputTextarea"
          @keydown.meta.s.prevent
          @keydown.ctrl.s.prevent
          @keydown.meta.s="saveMemo"
          @keydown.ctrl.s="saveMemo"
        ></textarea>
      </div>
      <div
        v-if="props.document.type === 'FILE' || props.document.type === 'IMAGE'"
        class="flex gap-4"
      >
        <button
          class="basis-1/2 mt-12 flex grow h-[52px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#e6e8eb]"
          @click="openFile"
        >
          <p
            class="grow flex gap-2 items-center justify-center w-full text-center text-lg font-bold text-gray-900"
          >
            원본 열기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              class="align-bottom shrink-0"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
              />
            </svg>
          </p>
        </button>
        <button
          class="basis-1/2 relative mt-12 flex flex-col h-[52px] w-full items-start justify-center overflow-hidden rounded-xl bg-[#1f8ce6]"
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
              원문으로 이동하기
            </p>
          </div>
        </NuxtLink>
      </div>
      <div
        v-if="
          props.document.type === 'MEMO' &&
          updatedText !== props.document.content
        "
        class="flex gap-4"
      >
        <button
          class="basis-1/2 mt-12 flex h-[52px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#e6e8eb]"
          @click="
            if (textarea) textarea.value = props.document.content;
            inputTextarea();
          "
        >
          <p class="flex text-center text-lg font-bold text-gray-900">
            되돌리기
          </p>
        </button>
        <button
          class="basis-1/2 mt-12 flex h-[52px] w-full items-center justify-center overflow-hidden rounded-xl"
          :class="hasError ? 'bg-[#f83a41]' : 'bg-[#1f8ce6]'"
          @click="saveMemo"
        >
          <p class="flex text-center text-lg font-bold text-white">
            {{ hasError ? '저장 재시도' : '수정내용 저장하기' }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import { useRouter } from 'nuxt/app';
import { useDocumentStore } from '~/stores/document';

const router = useRouter();

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
const textareaObserver = ref<ResizeObserver | null>(null);

const progress = ref<number | null>(null);
const downloadBtnText = ref('다운로드');

const hasError = ref(false);

const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const handleConfirmClick = async () => {
  isModalOpen.value = false;
  await documentStore.deleteDocument(props.document.docId);
  router.back();
};
const handleIsOpenUpdate = (value: boolean) => {
  isModalOpen.value = value;
};
const isCollectionModalOpen = ref(false);
const openCollectionModal = () => {
  isCollectionModalOpen.value = true;
};
const handleCollectionIsOpenUpdate = (newIsOpen: boolean) => {
  isCollectionModalOpen.value = newIsOpen;
};

const emit = defineEmits<{
  (event: 'shouldFetch'): void;
}>();

onMounted(() => {
  if (props.document.type === 'MEMO' && textarea.value) {
    textarea.value.value = props.document.content;
    updatedText.value = props.document.content;
    inputTextarea();
  }

  if (props.document.type === 'MEMO') {
    setResizeObserver();
  }
});

onBeforeUnmount(() => {
  if (props.document.type === 'MEMO') {
    unsetResizeObserver();
  }
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

const saveMemo = async () => {
  if (textarea.value || updatedText.value !== props.document.content) {
    hasError.value = false;
    const result = await documentStore.updateMemo(
      props.document.docId,
      updatedText.value,
    );
    if (result) {
      emit('shouldFetch');
    } else {
      hasError.value = true;
    }
  }
};

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
        return `AI가 이미지 분석에 실패했어요. 다음과 같은 이유일 수 있어요.
 1. AI가 분석할 수 없는 이미지 형식이에요.
 2. AI 서버가 과부하 상태에요.
 3. 이미지가 너무 크거나 너무 작아요.
등록 후 2시간 동안 자동으로 여러 번 재시도해요. 직접 다시 시도하기를 원한다면 삭제 후 다시 추가해주세요.`;
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
      return `스크랩에 실패했어요. 다음과 같은 이유일 수 있어요.
 1. 해당 웹페이지가 존재하지 않거나, 접속할 수 없어요.
 2. 해당 웹페이지가 본문을 스크랩할 수 없는 형식이에요.
 3. 해당 웹페이지가 스크랩을 거부했어요.
등록 후 2시간동안 자동으로 여러 번 재시도해요. 직접 다시 시도하기를 원한다면 삭제 후 다시 추가해주세요.`;
    case 'EMBED_PENDING':
      return 'AI가 곧 자료를 요약할거에요.';
    case 'EMBED_PROCESSING':
      return 'AI가 자료를 요약중이에요!';
    case 'EMBED_REJECTED':
      return `AI가 자료를 요약하지 못했어요. 다음과 같은 이유일 수 있어요.
 1. AI가 요약할 수 없는 형식이에요.
 2. AI 서버가 과부하 상태에요.
등록 후 2시간동안 자동으로 여러 번 재시도해요. 직접 다시 시도하기를 원한다면 삭제 후 다시 추가해주세요.`;
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

const inputTextarea = () => {
  if (textarea.value) {
    updatedText.value = textarea.value.value;
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 5 + 'px';
  }
};

let signedUrl = '';

// singedUrl 유효성 검사 (남은 시간 30분 이상)
const isValidSignedUrl = () => {
  // X-Amz-Date 및 X-Amz-Expires 값 추출을 위한 정규 표현식
  const dateRegex = /X-Amz-Date=([\dT]*)Z/;
  const expiresRegex = /X-Amz-Expires=(\d+)/;

  const dateMatch = dateRegex.exec(signedUrl);
  const expiresMatch = expiresRegex.exec(signedUrl);

  if (dateMatch && expiresMatch) {
    const dateString = dateMatch[1];
    const expiresInSeconds = Number(expiresMatch[1]);

    // X-Amz-Date 값으로 Date 객체 생성 (UTC) ex: 20231024T194018Z
    const dateObject = new Date(
      Date.UTC(
        Number(dateString.slice(0, 4)),
        Number(dateString.slice(4, 6)) - 1,
        Number(dateString.slice(6, 8)),
        Number(dateString.slice(9, 11)),
        Number(dateString.slice(11, 13)),
        Number(dateString.slice(13, 15)),
      ),
    );

    // 유효한 최종 시각 계산
    dateObject.setSeconds(dateObject.getSeconds() + expiresInSeconds);

    // 현재 시각과의 차이 계산
    const timeDifference = dateObject.getTime() - new Date().getTime();

    // 남은 시간이 30분 이상인지 확인
    return timeDifference > 30 * 60 * 1000;
  } else {
    return false;
  }
};

const openFile = async () => {
  if (!signedUrl || !isValidSignedUrl())
    signedUrl = await documentStore.fetchFileDownloadUrl(props.document.docId);

  window.open(signedUrl, '_blank');
};

const fileDownload = async () => {
  if (progress.value) return;

  try {
    if (!signedUrl || !isValidSignedUrl())
      signedUrl = await documentStore.fetchFileDownloadUrl(
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
</script>
