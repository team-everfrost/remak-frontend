<template>
  <div class="flex h-screen flex-col">
    <ModalAddModal :is-open="isModalOpen" />
    <TopBarApp />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="0" class="mt-20" />
      <main class="mt-20 flex flex-grow bg-[#F4F6F8] ml-48">
        <div class="flex flex-grow flex-col m-20">
          <div class="flex items-center gap-4">
            <p class="text-neutral-900 text-[32px] font-bold leading-[44.80px]">
              메인
            </p>
            <div class="flex-grow"></div>
            <button
              ref="updateBtn"
              class="h-8 w-8"
              :disabled="isLoading"
              @click="cleanLoad()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 -960 960 960"
                width="28"
                :class="
                  isLoading
                    ? 'animate-spin text-gray-400'
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
            <button
              class="h-8 w-[78px] rounded-md bg-gray-600 text-base font-medium text-white"
            >
              편집하기
            </button>
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
                      :type="item.type"
                      :image-url="item.imageUrl"
                      :doc-id="item.docId"
                      :title="item.title"
                      :summary="item.summary"
                      :info="item.info"
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
const updateBtn = ref<HTMLElement | null>(null);
const updateObserver = ref<IntersectionObserver | null>(null);

const shouldUpdate = ref(false);

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
const openModal = () => {
  isModalOpen.value = true;
};

const shouldFetch = computed(() => {
  return documentStore.shouldFetch;
});

// 모달 생성 주체가 Topbar라서 일단 이렇게 처리
watch(shouldFetch, (newVal) => {
  if (newVal) {
    documentStore.setShouldFetch(false);
    cleanLoad();
  }
});

onMounted(() => {
  initLoad();
  setObserver();
});

onUnmounted(() => {
  unsetObserver();
});

onActivated(() => {
  setObserver();
  if (shouldUpdate.value) {
    initLoad();
  }
});

onDeactivated(() => {
  unsetObserver();
});

const setObserver = () => {
  if (!loadObserver.value)
    loadObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
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
          // cleanLoad();
        } else {
          shouldUpdate.value = false;
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

  if (shouldUpdate) cleanLoad();
};

const cleanLoad = async () => {
  isLoading.value = true;
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
};

const loadMore = async () => {
  if (isLoading.value || isEndOfDocuments.value) return;
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
};
</script>
