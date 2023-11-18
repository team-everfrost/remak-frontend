<template>
  <div class="flex h-screen flex-col">
    <ModalAddModal
      :is-open="isModalOpen"
      :open-type="addOpenType()"
      :url="pastedUrl"
      :files="pastedFiles"
      :memo="pastedMemo"
      @update:is-open="handleIsOpenUpdate"
    />
    <ModalDocumentInCollection
      :is-open="isCollectionModalOpen"
      :doc-id="selectedList"
      @update:is-open="handleCollectionIsOpenUpdate"
    />
    <DeleteAlert
      :is-open="isDeleteModalOpen"
      :modal-title="'정말 삭제하시겠어요?'"
      :modal-subtitle="'삭제시 복구가 불가능해요'"
      :cancel-button-text="'취소하기'"
      :confirm-button-text="'삭제하기'"
      @update:is-open="handleDeleteIsOpenUpdate"
      @confirm="handleDeleteConfirmClick"
    />
    <div v-show="selectMode || !topIntersection">
      <TopBar />
    </div>
    <div v-show="!selectMode && topIntersection">
      <TopBarApp @update:is-open="handleTopbarModalOpenUpdate" />
    </div>
    <div
      v-show="!topIntersection"
      class="fixed z-20 h-20 right-20 items-center justify-end"
    >
      <div
        v-if="!topIntersection && !selectMode"
        class="flex h-20 items-center justify-end gap-4"
      >
        <button
          class="relative flex h-8 flex-shrink-0 w-[78px] items-center justify-center rounded-md bg-[#1f8ce6] text-center text-base font-medium text-white"
          @click="openModal"
        >
          추가하기
        </button>
        <button
          class="h-8 w-[78px] rounded-md bg-gray-600 text-base font-medium text-white disabled:opacity-50"
          @click="setSelectMode(true)"
        >
          편집하기
        </button>
      </div>
      <div
        v-if="!topIntersection && selectMode"
        class="flex h-20 items-center justify-end gap-4"
      >
        <button
          :disabled="isLoading || !selectedList.length"
          class="h-8 w-[78px] rounded-md bg-gray-600 text-base font-medium text-white flex items-center justify-center disabled:opacity-50"
          @click="openCollectionModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 -ml-2"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          컬렉션
        </button>
        <button
          :disabled="isLoading || !selectedList.length"
          class="h-8 w-[78px] rounded-md bg-white text-base font-medium border border-gray-200 text-red-500 disabled:opacity-50"
          @click="openDeleteModal"
        >
          삭제하기
        </button>
        <button
          :disabled="isLoading"
          class="h-8 w-[78px] rounded-md bg-white text-base font-medium border border-gray-200 text-slate-800 disabled:opacity-50"
          @click="setSelectMode(false)"
        >
          이전으로
        </button>
      </div>
    </div>
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="'main'" class="mt-20" />
      <main class="mt-20 flex flex-grow bg-[#F4F6F8]">
        <div class="flex flex-grow flex-col m-20">
          <div v-auto-animate class="flex items-center gap-4 justify-between">
            <p
              class="flex-shrink-0 text-neutral-900 text-[32px] font-bold leading-[44.80px]"
            >
              메인
            </p>
            <div class="flex flex-shrink-0 gap-4">
              <button
                ref="updateBtn"
                class="h-8 w-8"
                :disabled="isLoading || autoRefresh || selectMode"
                @click="initLoad()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  viewBox="0 -960 960 960"
                  width="28"
                  :class="
                    autoRefresh
                      ? 'animate-spin text-blue-400'
                      : isLoading
                      ? 'animate-spin text-gray-400'
                      : selectMode
                      ? 'text-gray-400'
                      : hasError
                      ? 'text-red-500'
                      : ''
                  "
                  fill="currentColor"
                >
                  <path
                    d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z"
                  />
                </svg>
              </button>
              <div v-if="!selectMode" class="flex flex-shrink-0 gap-4">
                <button
                  class="h-8 w-[78px] rounded-md bg-gray-600 text-base font-medium text-white disabled:opacity-50"
                  @click="setSelectMode(true)"
                >
                  편집하기
                </button>
              </div>
              <div v-else class="flex flex-shrink-0 gap-4">
                <button
                  :disabled="isLoading || !selectedList.length"
                  class="h-8 w-[78px] rounded-md bg-gray-600 text-base font-medium text-white flex items-center justify-center disabled:opacity-50"
                  @click="openCollectionModal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 -ml-2"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                  컬렉션
                </button>
                <button
                  :disabled="isLoading || !selectedList.length"
                  class="h-8 w-[78px] rounded-md bg-white text-base font-medium border border-gray-200 text-red-500 disabled:opacity-50"
                  @click="openDeleteModal"
                >
                  삭제하기
                </button>
                <button
                  :disabled="isLoading"
                  class="h-8 w-[78px] rounded-md bg-white text-base font-medium border border-gray-200 text-slate-800 disabled:opacity-50"
                  @click="setSelectMode(false)"
                >
                  이전으로
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="isInitialLoad === 'error'"
            class="text-neutral-900 text-xl leading-normal my-7 mx-auto items-center justify-center flex flex-col gap-4"
          >
            <p>문서를 불러오는데 오류가 발생했습니다.</p>
            <button
              class="relatvie flex h-12 w-32 items-center justify-center rounded-xl bg-[#1f8ce6]"
              @click="reloadNuxtApp()"
            >
              <p
                class="flex-shrink-0 flex-grow-0 text-center text-xl font-medium text-white"
              >
                새로고침
              </p>
            </button>
          </div>
          <div v-else-if="isInitialLoad === 'true'">
            <div
              class="animate-pulse bg-[#e6e8eb] h-9 mt-8 mb-7 w-24 rounded-lg"
            ></div>
            <div
              class="animate-pulse gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <MainSkeletonCard
                v-for="number in [...Array(10).keys()].map((i) => i + 1)"
                :key="number"
                :image="true"
              />
            </div>
          </div>
          <div v-else-if="!loadedDocumentsCount" class="flex flex-grow">
            <NoItemBox
              :discription="'등록된 자료가 없어요'"
              :button-text="'새 자료 등록하기'"
              :open="openModal"
            />
          </div>
          <div v-else class="flex flex-col">
            <div
              v-for="list in [
                { title: '오늘', docs: todayDocuments },
                { title: '최근 일주일', docs: last7daysDocuments },
                { title: '최근 한 달', docs: last30daysDocuments },
                { title: '전체', docs: olderDocuments },
              ]"
              :key="list.title"
            >
              <div v-show="list.docs.length > 0">
                <div
                  class="mt-8 text-neutral-900 text-2xl font-bold leading-normal mb-7"
                >
                  {{ list.title }}
                </div>
                <MasonryWall :items="list.docs" :column-width="258" :gap="16">
                  <template #default="{ item }">
                    <MainDocumentCard
                      :key="item.docId"
                      :select-mode="selectMode"
                      :type="item.type"
                      :image-url="item.imageUrl"
                      :doc-id="item.docId"
                      :title="item.title"
                      :summary="item.summary"
                      :info="item.info"
                      @is-selected="setSelected($event, item.docId)"
                    />
                  </template>
                </MasonryWall>
              </div>
            </div>
          </div>
          <div
            v-if="!isEndOfDocuments"
            ref="loadObserverTarget"
            class="bottom-0 -z-50 h-[500px] w-full -mt-[500px]"
          ></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocumentStore } from '~/stores/document';

const isInitialLoad = ref('true');
const isEndOfDocuments = computed(() => {
  return documentStore.isEndOfDocuments();
});
const loadObserverTarget = ref<HTMLElement | null>(null);
const loadObserver = ref<IntersectionObserver | null>(null);
const loadIntersection = ref(false);

const updateBtn = ref<HTMLElement | null>(null);
const updateObserver = ref<IntersectionObserver | null>(null);

const shouldUpdate = ref(true);
const topIntersection = ref(true);

const autoRefresh = ref(false);
const isLoading = ref(false);
const hasError = ref(false);
const documentStore = useDocumentStore();

const loadedDocumentsCount = computed(() => {
  return (
    todayDocuments.value.length +
    last7daysDocuments.value.length +
    last30daysDocuments.value.length +
    olderDocuments.value.length
  );
});

const todayDocuments = ref([] as any[]);
const last7daysDocuments = ref([] as any[]);
const last30daysDocuments = ref([] as any[]);
const olderDocuments = ref([] as any[]);

const isModalOpen = ref(false);
const isTopbarModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const handleIsOpenUpdate = (value: boolean) => {
  isModalOpen.value = value;
};

const handleTopbarModalOpenUpdate = (value: boolean) => {
  isTopbarModalOpen.value = value;
};

const isUploadListenerActive = ref(false);
const isDragover = ref(false);
const pasteType = ref('');
const pastedUrl = ref('');
const pastedFiles = ref([] as File[]);
const pastedMemo = ref('');

const addOpenType = () => {
  if (pasteType.value === 'link') return 2;
  if (pasteType.value === 'file') return 3;
  if (pasteType.value === 'memo') return 4;
  return 1;
};

const shouldFetch = computed(() => {
  return documentStore.shouldFetch;
});

// 모달 생성 주체가 Topbar라서 일단 이렇게 처리
watch(shouldFetch, async (newVal) => {
  if (newVal === true || newVal === 'cache') await initLoad();
  documentStore.setShouldFetch(false);
});

onActivated(() => {
  setObserver();
  if (shouldUpdate.value || shouldFetch.value === 'cache') {
    initLoad();
  }
  addUploadListeners();
});

onDeactivated(() => {
  clearInterval(todayLoadInterval);
  unsetObserver();
  removeUploadListeners();
});

const setObserver = () => {
  if (!loadObserver.value)
    loadObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadIntersection.value = true;
          loadMore();
        } else {
          loadIntersection.value = false;
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );
  if (loadObserverTarget.value)
    loadObserver.value?.observe(loadObserverTarget.value);

  if (!updateObserver.value)
    updateObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          shouldUpdate.value = true;
          topIntersection.value = true;
          // 뭔가 이상해서 비활성화
          // cleanLoad();
        } else {
          shouldUpdate.value = false;
          topIntersection.value = false;
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    );
  if (updateBtn.value) updateObserver.value?.observe(updateBtn.value);
};

const unsetObserver = () => {
  if (loadObserverTarget.value) loadObserver.value?.disconnect();
  if (updateBtn.value) updateObserver.value?.disconnect();
};

const updateDragover = (status: boolean) => (e: any) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';

  if (!e.dataTransfer.types.includes('Files')) return;

  if (status === true) {
    if (
      !isModalOpen.value &&
      !isTopbarModalOpen.value &&
      !selectMode.value &&
      !isCollectionModalOpen.value &&
      !isDeleteModalOpen.value
    ) {
      pasteType.value = 'file';
      openModal();
      nextTick(() => {
        pasteType.value = '';
      });
    }
  }
  isDragover.value = status;
};

const onPaste = (e: any) => {
  e.preventDefault();
  if (
    !isModalOpen.value &&
    !isTopbarModalOpen.value &&
    !selectMode.value &&
    !isCollectionModalOpen.value &&
    !isDeleteModalOpen.value
  ) {
    pasteType.value = '';
    pastedUrl.value = '';
    pastedFiles.value = [];
    pastedMemo.value = '';

    const clipboardData = e.clipboardData || (window as any).clipboardData;

    if (clipboardData?.items) {
      const files: File[] = [];
      for (const item of clipboardData.items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (!file) continue;
          files.push(file);
        }
      }
      if (files.length) {
        pasteType.value = 'file';
        pastedFiles.value = files;
        openModal();
        return;
      }
    }

    const pastedText = clipboardData?.getData('text');
    if (!pastedText) return;

    const isUrl = /^(?:(?:https?):\/\/)?(?:[\S]+\.+[\S]+)(?:\/[^\s]*)?$/i.test(
      pastedText,
    );

    if (isUrl) {
      pasteType.value = 'link';
      pastedUrl.value = pastedText;
      openModal();
    } else {
      pasteType.value = 'memo';
      pastedMemo.value = pastedText;
      openModal();
    }
  }
};

let dragOverHandler: any = null;
let dragLeaveHandler: any = null;

const addUploadListeners = () => {
  if (!isUploadListenerActive.value) {
    dragOverHandler = updateDragover(true);
    dragLeaveHandler = updateDragover(false);

    // 드래그
    window.addEventListener('dragover', dragOverHandler);
    window.addEventListener('dragleave', dragLeaveHandler);
    // 붙여넣기
    window.addEventListener('paste', onPaste);
    isUploadListenerActive.value = true;
  }
};

const removeUploadListeners = () => {
  if (isUploadListenerActive.value) {
    window.removeEventListener('dragover', dragOverHandler);
    window.removeEventListener('dragleave', dragLeaveHandler);
    window.removeEventListener('paste', onPaste);
    isUploadListenerActive.value = false;
  }
};

const initLoad = async () => {
  isLoading.value = true;
  const result = await documentStore.fetchCached();
  if (!result) {
    isInitialLoad.value = 'error';
    isLoading.value = false;
    hasError.value = true;
    return;
  }
  const docs = cardSplitter(result);

  todayDocuments.value = docs.today;
  last7daysDocuments.value = docs.last7days;
  last30daysDocuments.value = docs.last30days;
  olderDocuments.value = docs.older;

  isInitialLoad.value = 'false';
  isLoading.value = false;
  hasError.value = false;

  if (shouldUpdate.value || shouldFetch.value === true) await cleanLoad();

  checkAutoRefresh();
};

const cleanLoad = async () => {
  isLoading.value = true;
  window.scrollTo(0, 0);
  const result = await documentStore.cleanFetch();
  if (!result) {
    isLoading.value = false;
    hasError.value = true;
    return;
  }
  const docs = cardSplitter(result);

  todayDocuments.value = docs.today;
  last7daysDocuments.value = docs.last7days;
  last30daysDocuments.value = docs.last30days;
  olderDocuments.value = docs.older;

  isLoading.value = false;
  hasError.value = false;

  // 최초 로드 이후 화면에 loadObserver가 있을경우 추가로드
  if (loadIntersection.value) loadMore();
};

const loadMore = async () => {
  if (hasError.value || isLoading.value || isEndOfDocuments.value) return;
  isLoading.value = true;

  const olderDocs = await documentStore.fetchMore();
  if (!olderDocs) {
    isLoading.value = false;
    return;
  }

  const docs = cardSplitter(olderDocs);

  if (docs.today.length)
    todayDocuments.value = [...todayDocuments.value, ...docs.today];
  if (docs.last7days.length)
    last7daysDocuments.value = [...last7daysDocuments.value, ...docs.last7days];
  if (docs.last30days.length)
    last30daysDocuments.value = [
      ...last30daysDocuments.value,
      ...docs.last30days,
    ];
  if (docs.older.length)
    olderDocuments.value = [...olderDocuments.value, ...docs.older];

  isLoading.value = false;
  hasError.value = false;

  // 최초 로드 이후 화면에 loadObserver가 있을경우 추가로드
  if (loadIntersection.value) loadMore();
};

const todayLoad = async () => {
  isLoading.value = true;
  const result = await documentStore.cleanFetch();
  if (!result) {
    isLoading.value = false;
    hasError.value = true;
    return;
  }
  const todayDocs = cardSplitter(result).today;

  while (todayDocuments.value.length > todayDocs.length) {
    const result = await documentStore.fetchMore();
    if (!result) {
      isLoading.value = false;
      hasError.value = true;
      return;
    }
    const splitedDocs = cardSplitter(result);
    todayDocs.push(splitedDocs.today);
    if (splitedDocs.today.length === 0) break;
  }

  todayDocuments.value = todayDocs;

  isLoading.value = false;
  hasError.value = false;
};

let todayLoadInterval: any = null;

const checkAutoRefresh = () => {
  clearInterval(todayLoadInterval); // 이전 인터벌을 정리합니다.
  const result = documentStore.getDocuments();

  for (const doc of result) {
    // 12시간 이내의 문서만 체크합니다.
    if (Date.now() - new Date(doc.updatedAt).getTime() > 43200000) break;

    // 로드 중인 상태인지 확인합니다.
    if (
      doc.status === 'SCRAPE_PENDING' ||
      doc.status === 'SCRAPE_PROCESSING' ||
      (doc.status === 'EMBED_PENDING' && doc.type !== 'MEMO') ||
      doc.status === 'EMBED_PROCESSING'
    ) {
      autoRefresh.value = true;
      // 2초마다 cleanLoad를 실행합니다.
      todayLoadInterval = setInterval(async () => {
        await todayLoad();
        let loopMore = false;
        const newResult = documentStore.getDocuments();
        for (const doc of newResult) {
          // 12시간 이내의 문서만 체크합니다.
          if (Date.now() - new Date(doc.updatedAt).getTime() > 43200000) break;

          // 로드 중인 상태인지 확인합니다.
          if (
            doc.status === 'SCRAPE_PENDING' ||
            doc.status === 'SCRAPE_PROCESSING' ||
            (doc.status === 'EMBED_PENDING' && doc.type !== 'MEMO') ||
            doc.status === 'EMBED_PROCESSING'
          ) {
            loopMore = true;
            break;
          }
        }
        if (!loopMore) {
          clearInterval(todayLoadInterval);
          autoRefresh.value = false;
        }
      }, 2000);
      return; // 로드 중인 문서를 찾았으므로 더 이상 체크할 필요가 없습니다.
    }
  }

  // 로드 중인 문서가 없으면 autoRefresh 상태를 false로 설정합니다.
  autoRefresh.value = false;
};

const selectMode = ref(false);
const selectedList = ref([] as string[]);

const setSelectMode = (value: boolean) => {
  selectMode.value = value;
  selectedList.value = [];

  if (value) {
    clearInterval(todayLoadInterval);
    autoRefresh.value = false;
  } else {
    checkAutoRefresh();
  }
};

const setSelected = (value: boolean, docId: string) => {
  if (value) {
    selectedList.value.push(docId);
  } else {
    selectedList.value = selectedList.value.filter((id) => id !== docId);
  }
};

const deleteDocuments = async (docIds: string[]) => {
  if (isLoading.value) return;
  isLoading.value = true;

  await documentStore.deleteDocuments(docIds);
  // 오류처리

  isLoading.value = false;
  setSelectMode(false);
};

const isDeleteModalOpen = ref(false);
const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};
const handleDeleteConfirmClick = async () => {
  isDeleteModalOpen.value = false;
  await deleteDocuments(selectedList.value);
};
const handleDeleteIsOpenUpdate = (value: boolean) => {
  isDeleteModalOpen.value = value;
};
const isCollectionModalOpen = ref(false);
const openCollectionModal = () => {
  isCollectionModalOpen.value = true;
};
const handleCollectionIsOpenUpdate = (newIsOpen: boolean) => {
  isCollectionModalOpen.value = newIsOpen;
};
</script>
