<template>
  <div class="flex min-h-screen flex-col">
    <TopBar />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="2" class="mt-20"> </SideNavigation>
      <div class="bg-[#F4F6F8] ml-48 mt-20 flex flex-grow">
        <div class="m-20 flex flex-grow flex-col">
          <div class="flex w-full justify-start flex-row">
            <p class="font-bold text-[32px]">{{ tagName }}</p>
          </div>

          <div
            v-if="documents.length === 0 && isLoading == false"
            class="flex flex-grow"
          >
            <NoItemBox :discription="'등록된 자료가 없어요'" />
          </div>
          <div v-show="documents.length > 0" class="mt-9">
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
            v-if="!isEndOfDocuments"
            ref="loadObserverTarget"
            class="bottom-0 -z-50 h-[500px] w-full -mt-[500px]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTagStore } from '~/stores/tag';

const route = useRoute();
const tagStore = useTagStore();

const tagName = route.params.tagName as string;
const documents = ref([] as any[]);
let lastUpdatedAt = '';

const isLoading = ref(true);
const isEndOfDocuments = ref(false);
const loadObserverTarget = ref<HTMLElement | null>(null);
const loadObserver = ref<IntersectionObserver | null>(null);

onActivated(() => {
  initalLoad();
  setObserver();
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
};

const unsetObserver = () => {
  if (loadObserverTarget.value) loadObserver.value?.disconnect();
};

const initalLoad = async () => {
  isLoading.value = true;
  const result = await tagStore.cleanFetchTagDetail(tagName);

  if (!result || result.length < 20) {
    isEndOfDocuments.value = true;
  }

  if (result) {
    lastUpdatedAt = result[result.length - 1].updatedAt;
    documents.value = cardParser(result);
  }

  isLoading.value = false;
};

const loadMore = async () => {
  if (isEndOfDocuments.value || isLoading.value) return;
  isLoading.value = true;

  const result = await tagStore.fetchTagDetailMore(
    tagName,
    lastUpdatedAt,
    documents.value[documents.value.length - 1].docId,
  );

  if (!result || result.length < 20) {
    isEndOfDocuments.value = true;
  }

  if (result) {
    lastUpdatedAt = result[result.length - 1].updatedAt;
    documents.value = [...documents.value, ...cardParser(result)];
  }

  isLoading.value = false;
};
</script>
