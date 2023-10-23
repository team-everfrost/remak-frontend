<template>
  <div
    class="relative flex min-h-[372px] w-[480px] flex-col rounded-[20px] bg-white"
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
    <div v-auto-animate>
      <div
        v-if="!isUploading"
        class="ml-5 mr-5 mt-8 flex shrink-0 h-[196px] flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#e6e8eb] bg-[#fefefe] p-2.5"
        :class="
          fileList.length >= 10
            ? isDragover
              ? 'cursor-not-allowed bg-gray-200 ring-4 ring-red-500'
              : 'cursor-not-allowed bg-gray-200'
            : isDragover
            ? 'ring-4 ring-remak-blue'
            : ''
        "
      >
        <input
          ref="fileInput"
          type="file"
          multiple
          hidden
          accept="image/*,application/pdf,.txt"
          @change="onFileChange"
        />
        <div
          class="relative flex flex-shrink-0 flex-col items-center justify-start gap-4"
        >
          <img
            src="~/assets/icons/icon_add_file_without_border.svg"
            alt="파일 추가"
            :class="fileList.length >= 10 ? 'grayscale' : ''"
          />
          <div
            v-if="fileList.length < 10"
            class="relative flex flex-shrink-0 flex-grow-0 flex-col items-center justify-start gap-1"
          >
            <p
              class="flex-shrink-0 flex-grow-0 text-left text-base text-[#28323c]"
            >
              파일을 드래그 해보세요
            </p>
            <p
              class="flex-shrink-0 flex-grow-0 text-left text-sm text-[#646f7c]"
            >
              10MB 이하의 파일을 한번에 10개까지 추가 할 수 있어요
            </p>
          </div>
          <div
            v-if="fileList.length >= 10"
            class="relative flex flex-shrink-0 flex-grow-0 flex-col items-center justify-start gap-1"
          >
            <p
              class="flex-shrink-0 flex-grow-0 text-left text-base text-[#28323c]"
            >
              파일을 더 이상 추가할 수 없어요
            </p>
            <p
              class="flex-shrink-0 flex-grow-0 text-left text-sm text-[#646f7c]"
            >
              10MB 이하의 파일을 한번에 10개까지 추가 할 수 있어요
            </p>
          </div>
          <button
            class="relative flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2 rounded-lg border border-[#e6e8eb] bg-[#fefefe] px-2.5 py-1.5"
            :class="
              fileList.length >= 10
                ? 'cursor-not-allowed bg-gray-300 border-gray-300'
                : ''
            "
            :disabled="fileList.length >= 10"
            @click="onFileClick()"
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
              파일 선택하기
            </p>
          </button>
        </div>
      </div>
      <div
        v-if="isUploading"
        class="ml-5 mr-5 mt-8 flex shrink-0 h-[196px] flex-col items-center justify-center gap-2.5 rounded-2xl border overflow-hidden border-[#fefefe] bg-[#fefefe] p-2.5"
      >
        <img
          src="~/assets/loading.gif"
          alt="파일 업로드 중"
          class="w-32 h-32"
        />
        <div class="text-center text-slate-800 text-xl font-bold leading-tight">
          잠시만 기다려주세요
        </div>
      </div>
    </div>
    <div v-auto-animate>
      <div
        v-if="(fileList.length > 0 || lastMessage) && !isUploading"
        v-auto-animate
        class="relative ml-5 mt-4 mr-5 flex flex-col flex-shrink-0 gap-2 grow items-center rounded py-3"
      >
        <div
          class="flex justify-between w-full text-sm font-normal text-[#28323c] mb-2 px-1"
        >
          <div>{{ fileList.length }} / 10</div>
          <div class="text-red-500 font-medium">{{ lastMessage }}</div>
          <div class="cursor-pointer" @click="deleteAll">전체삭제</div>
        </div>
        <div
          v-for="file in fileList"
          :key="file.name"
          class="flex flex-row justify-between w-full"
        >
          <p
            class="pl-1 grow text-left text-sm font-bold text-[#28323c] line-clamp-1"
          >
            {{ file.name }}
          </p>
          <span
            class="flex-shrink-0 flex-grow-0 text-sm font-normal text-gray-400 pr-2"
          >
            {{
              file.size > 1024 * 1024
                ? `${Math.round(file.size / (1024 * 1024))}MB`
                : `${Math.round(file.size / 1024)}KB`
            }}
          </span>
          <button @click="deleteFile(file)">
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
    </div>

    <button
      :disabled="fileList.length === 0 || fileList.length > 10 || isUploading"
      class="relative mb-5 ml-5 mr-5 mt-6 flex flex-col h-[52px] flex-shrink-0 flex-grow-0 items-start justify-center self-stretch overflow-hidden rounded-xl bg-[#1f8ce6]"
      :class="
        hasError
          ? 'bg-[#f83a41] text-white'
          : isUploading
          ? 'bg-gradient-to-r from-emerald-500 from-60% to-bg-[#1f8ce4]'
          : fileList.length === 0 || fileList.length > 10
          ? 'bg-[#eee] text-[#C5C8CE]'
          : 'bg-[#1F8CE6] text-white'
      "
      @click="uploadFiles"
    >
      <div
        class="h-full"
        :class="hasError"
        :style="
          progress
            ? 'width: ' + progress.toString().padStart(2, '0') + '%'
            : 'width:100%'
        "
      ></div>
      <p class="absolute w-full flex-grow text-center text-lg font-bold">
        {{
          isUploading
            ? '업로드 중...' + progress.toString().padStart(2, '0') + '%'
            : hasError
            ? '업로드 재시도'
            : '저장하기'
        }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAddStore } from '~/stores/add';

const fileList = ref<any[]>([]);
const fileInput = ref<HTMLInputElement>();
const isDragover = ref(false);
const lastMessage = ref('');
const isUploading = ref(false);
const hasError = ref(false);

const addStore = useAddStore();
const progress = computed(() => addStore.fileUploadProgress);

const emit = defineEmits<{
  (event: 'changeComponent', componentName: string): void;
  (event: 'isUploading', isUploading: boolean): void;
}>();

const deleteAll = () => {
  fileList.value = [];
  lastMessage.value = '';
  hasError.value = false;
};

const deleteFile = (file: any) => {
  fileList.value = fileList.value.filter((item) => item !== file);
  lastMessage.value = '';
  hasError.value = false;
};

const onFileDrop = (e: any) => {
  e.preventDefault();
  isDragover.value = false;
  const files = e.dataTransfer.files;
  handleFiles(files);
};

const onFileClick = () => {
  if (!fileInput.value) return;
  fileInput.value.click();
};

const onFileChange = (e: any) => {
  const files = e.target.files;
  handleFiles(files);
};

const handleFiles = (files: any) => {
  lastMessage.value = '';
  hasError.value = false;
  if (!files || fileList.value.length >= 10) return;
  for (const file of files) {
    // 중복파일 처리
    if (fileList.value.find((item) => item.name === file.name)) {
      lastMessage.value = '이미 추가한 파일이에요';
      continue;
    }

    // 파일 사이즈 제한
    if (file.size > 1024 * 1024 * 10) {
      lastMessage.value =
        '10MB 이하의 파일만 추가할 수 있어요 (' +
        Math.round(file.size / (1024 * 1024)) +
        'MB)';
      continue;
    }

    // 파일 타입 제한
    if (
      !file.type.includes('image') &&
      !file.type.includes('pdf') &&
      !file.type.includes('text')
    ) {
      lastMessage.value = '이미지, PDF, 텍스트 파일만 추가할 수 있어요';
      continue;
    }

    // 10개 이상 추가 불가
    if (fileList.value.length >= 10) {
      lastMessage.value = '10개까지만 추가할 수 있어요';
      continue;
    }

    fileList.value.push(file);
  }
};

const uploadFiles = async () => {
  if (isUploading.value || fileList.value.length === 0) return;

  isUploading.value = true;
  emit('isUploading', isUploading.value);
  window.addEventListener('beforeunload', pageLeave);
  hasError.value = false;
  removeEventListeners();

  const status = await addStore.addFiles(fileList.value as unknown as FileList);

  window.removeEventListener('beforeunload', pageLeave);
  isUploading.value = false;
  emit('isUploading', isUploading.value);

  if (status) {
    fileList.value = [];
    emit('changeComponent', 'cancel');
  } else {
    hasError.value = true;
    addEventListeners();
  }
};

const updateDragover = (status: boolean) => (e: any) => {
  e.preventDefault();
  if (fileList.value.length >= 10) {
    e.dataTransfer.dropEffect = 'none';
  } else {
    e.dataTransfer.dropEffect = 'copy';
  }
  isDragover.value = status;
};

const isListenerActive = ref(false);

const pageLeave = (e: any) => {
  const message = '파일 업로드 중입니다. 정말 나가시겠어요?';

  e.preventDefault();
  e.returnValue = message;
  return message;
};

const addEventListeners = () => {
  if (!isListenerActive.value) {
    window.addEventListener('dragover', updateDragover(true));
    window.addEventListener('dragleave', updateDragover(false));
    window.addEventListener('drop', onFileDrop);
    isListenerActive.value = true;
  }
};

const removeEventListeners = () => {
  if (isListenerActive.value) {
    window.removeEventListener('dragover', updateDragover(true));
    window.removeEventListener('dragleave', updateDragover(false));
    window.removeEventListener('drop', onFileDrop);
    isListenerActive.value = false;
  }
};

onMounted(() => {
  addEventListeners();
});

onActivated(() => {
  addEventListeners();
});

onDeactivated(() => {
  removeEventListeners();
});

onUnmounted(() => {
  removeEventListeners();
});
</script>
