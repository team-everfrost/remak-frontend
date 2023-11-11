<template>
  <div class="flex min-h-screen">
    <ModalAddModal
      :is-open="isModalOpen"
      @update:is-open="handleIsOpenUpdate"
    />
    <TopBarApp />
    <div class="flex grow">
      <SideNavigation :active-button="'search'" class="mt-20"> </SideNavigation>
      <div class="w-full bg-[#F4F6F8] mt-20 flex items-stretch">
        <div class="w-full flex flex-col m-20 bg-[#F4F6F8]">
          <div class="flex w-full justify-between">
            <p class="font-bold text-[32px]">검색</p>
          </div>
          <div class="flex mt-9 gap-2">
            <div
              class="flex h-14 w-full items-center rounded-xl bg-white border border-[#e6e8eb] focus-within:outline-none focus-within:ring-1 focus-within:border-[#1f8ce6]"
              :class="
                isLoading
                  ? 'transition-shadow duration-1000 shadow-xl shadow-remak-blue/50'
                  : hasError
                  ? 'shadow-md shadow-red-500/50'
                  : ''
              "
            >
              <img class="pl-4" src="~/assets/search.svg" alt="검색" />
              <input
                ref="searchInput"
                v-model="query"
                type="text"
                class="w-full h-full text-[#646f7c] text-base font-medium outline-none mx-2"
                placeholder="검색어를 입력해주세요"
                @input="onInput"
                @keyup.enter="onEnter"
                @keyup.esc="queryClear"
              />
              <button v-show="query" class="pr-4" @click="queryClear">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#28323C"
                    stroke="#28323C"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path d="M9 9L12 12L15 15" fill="white" />
                  <path
                    d="M9 9L12 12L15 15"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path d="M15 9L12 12L9 15" fill="white" />
                  <path
                    d="M15 9L12 12L9 15"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div v-if="!query">
            <div
              class="w-full flex-col justify-start items-start gap-6 inline-flex mt-10"
            >
              <div class="w-full justify-between items-center inline-flex">
                <div
                  class="text-neutral-900 text-xl font-bold shrink-0 leading-tight"
                >
                  최근 검색어
                </div>
                <button
                  class="px-1 py-2.5 justify-end items-center flex"
                  @click="clearHistory"
                >
                  <div
                    class="text-center text-gray-500 text-xs font-medium shrink-0 underline leading-3"
                  >
                    전체 삭제
                  </div>
                </button>
              </div>
              <div class="w-full flex-col justify-start items-start gap-5 flex">
                <div v-for="entry in history" :key="entry" class="w-full flex">
                  <button
                    class="text-start text-slate-800 text-base font-normal grow"
                    @click="clickHistoryEntry(entry)"
                  >
                    <div class="line-clamp-1">
                      {{ entry }}
                    </div>
                  </button>
                  <button
                    class="w-5 h-5 shrink-0"
                    @click="deleteHistoryEntry(entry)"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="#28323C"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="query" class="mt-9 grow">
            <div v-show="documents.length > 0">
              <MasonryWall :items="documents" :column-width="258" :gap="16">
                <template #default="{ item }">
                  <MainDocumentCard
                    :type="item.type"
                    :image-url="item.imageUrl"
                    :doc-id="item.docId"
                    :title="item.title"
                    :summary="item.summary"
                    :info="item.info"
                    :select-mode="false"
                  />
                </template>
              </MasonryWall>
            </div>
            <div
              v-show="documents.length == 0 && !isLoading && !hasError && idle"
              class="grow items-center justify-center flex h-full pb-32"
            >
              <div class="text-center">
                <span
                  class="text-neutral-900 text-lg font-medium leading-normal"
                  >{{ query }}</span
                >
                <span class="text-gray-500 text-lg font-normal leading-normal">
                  검색 결과가 없어요.<br />다른 검색어를 시도해 보는건
                  어떨까요?</span
                >
              </div>
            </div>
            <div
              v-show="hasError"
              class="grow items-center justify-center flex h-full pb-32"
            >
              <div class="text-center">
                <span class="text-gray-500 text-lg font-normal leading-normal">
                  오류가 발생했어요.<br />네트워크 연결에 문제가 있거나 서버에
                  문제가 있는 것 같아요</span
                >
              </div>
            </div>
          </div>
          <div
            ref="loadObserverTarget"
            class="bottom-0 -z-50 h-40 w-full -mt-40"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/search';

const query = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const history = computed(() => searchStore.searchHistory.slice().reverse());

const isLoading = ref(false);
const hasError = ref(false);
const idle = ref(false);
const textSearchCanceled = ref(false);
const documents = ref([] as any[]);

const isEndOfDocuments = computed(() => {
  return searchStore.isEndOfDocuments();
});
const loadObserverTarget = ref<HTMLElement | null>(null);
const loadObserver = ref<IntersectionObserver | null>(null);
const loadIntersection = ref(false);

const searchStore = useSearchStore();

onActivated(() => {
  setObserver();
  searchInput.value?.focus();
  isLoading.value = false;
  hasError.value = false;
});

onDeactivated(() => {
  unsetObserver();
});

const setObserver = () => {
  if (!loadObserver.value)
    loadObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadIntersection.value = true;
          if (query.value.trim() && !isLoading && !isError)
            textSearchMore(query.value);
        } else {
          loadIntersection.value = false;
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );
  if (loadObserverTarget.value)
    loadObserver.value?.observe(loadObserverTarget.value);
};

const unsetObserver = () => {
  if (loadObserverTarget.value) loadObserver.value?.disconnect();
};

const isModalOpen = ref(false);

const handleIsOpenUpdate = (value: boolean) => {
  isModalOpen.value = value;
};

const queryClear = () => {
  query.value = '';
  hasError.value = false;
};

const clearHistory = () => {
  searchStore.clearSearchHistory();
};

const clickHistoryEntry = (entry: string) => {
  deleteHistoryEntry(entry);
  searchStore.addSearchHistory(entry);
  query.value = entry;
  onEnter();
};

const deleteHistoryEntry = (entry: string) => {
  searchStore.deleteSearchHistory(entry);
};

const onInput = (event: Event) => {
  idle.value = false;
  query.value = (event.target as HTMLInputElement).value;
  if (query.value.trim()) {
    getTextSearch(query.value);
    waitedHybridSearch(query.value);
  }
};

const onEnter = () => {
  if (query.value.trim()) {
    getHybridSearch(query.value);
    searchStore.addSearchHistory(query.value.trim());
  }
};

const getTextSearch = useDebounceFn(
  (query) => {
    textSearch(query.trim());
  },
  300,
  { maxWait: 1000 },
);

const getHybridSearch = useDebounceFn(
  (query) => {
    hybridSearch(query.trim());
  },
  300,
  { maxWait: 1000 },
);

const waitedHybridSearch = useDebounceFn(async (query) => {
  if (query.trim() && documents.value.length === 0) {
    await hybridSearch(query.trim());
    idle.value = true;
  }
}, 1100);

const textSearch = async (query: string) => {
  if (query.trim()) {
    isLoading.value = true;
    textSearchCanceled.value = false;
    const result = await searchStore.cleanTextSearch(query);

    isLoading.value = false;

    if (result) {
      if (textSearchCanceled.value) return;
      documents.value = cardParser(result);
      if (loadIntersection.value) textSearchMore(query);
    } else {
      hasError.value = true;
    }
  }
};

const textSearchMore = async (query: string) => {
  if (isEndOfDocuments.value || isLoading.value) return;
  if (query.trim()) {
    isLoading.value = true;
    hasError.value = false;
    textSearchCanceled.value = false;
    const result = await searchStore.textSearchMore(query);

    isLoading.value = false;

    if (result) {
      if (textSearchCanceled.value) return;
      documents.value = [...documents.value, ...cardParser(result)];
      if (loadIntersection.value) textSearchMore(query);
    } else if (result === false) {
      hasError.value = true;
    }
  }
};

const hybridSearch = async (query: string) => {
  if (query.trim()) {
    if (isLoading.value) textSearchCanceled.value = true;

    isLoading.value = true;
    hasError.value = false;
    const result = await searchStore.hybridSearch(query);

    if (result) {
      documents.value = cardParser(result);
    } else if (result === false) {
      hasError.value = true;
    }
    textSearchCanceled.value = false;
  }
  isLoading.value = false;
};
</script>
