<template>
  <div class="flex h-screen flex-col">
    <ModalsContainer />
    <TopBarBase />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="0" class="mt-20" />
      <div class="mt-20 flex-grow bg-[#F4F6F8] ml-48">
        <div class="flex flex-col m-20">
          <div class="flex items-center justify-between mb-4">
            <p class="text-neutral-900 text-[32px] font-bold leading-[44.80px]">
              메인
            </p>
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
              class="animate-pulse bg-[#e6e8eb] h-9 mb-7 w-24 rounded-lg"
            ></div>
            <MasonryWall
              :items="Array(20).fill({})"
              :column-width="258"
              :gap="16"
            >
              <template #default="{ index }">
                <MainSkeletonCard :image="index % 5 ? true : false" />
              </template>
            </MasonryWall>
          </div>
          <div v-else class="">
            <div
              class="text-neutral-900 text-2xl font-bold leading-normal mb-7"
            >
              오늘
            </div>
            <MasonryWall :items="documentCards" :column-width="258" :gap="16">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall';
import { ModalsContainer } from 'vue-final-modal';
import { useDocumentStore } from '~/stores/document';

defineComponent({
  components: {
    MasonryWall,
  },
});

const isInitialLoad = ref('true');
const loading = ref(false);
const documentStore = useDocumentStore();

const summary = (
  type: string,
  status: string,
  content: string,
  summary: string,
) => {
  if (type === 'MEMO') return content.split('\n')[1] ?? '';
  if (type === 'IMAGE') {
    switch (status) {
      case 'EMBED_PENDING':
        return 'AI가 곧 이미지를 분석할거에요.';
      case 'EMBED_PROCESSING':
        return 'AI가 이미지를 분석중이에요!';
      case 'EMBED_REJECTED':
        return 'AI가 이미지 분석에 실패했어요.';
      default:
        return summary?.split('\n')[0] ?? '';
    }
  }
  switch (status) {
    case 'EMBED_PENDING':
      return 'AI가 곧 자료를 요약할거에요.';
    case 'EMBED_PROCESSING':
      return 'AI가 자료를 요약중이에요!';
    case 'EMBED_REJECTED':
      return 'AI가 자료를 요약하지 못했어요.';
    default:
      return summary?.split('\n')[0] ?? '';
  }
};

const info = (type: string, url: string, updatedAt: string) => {
  if (type === 'WEBPAGE') return new URL(url).hostname;
  return new Date(Date.parse(updatedAt))
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/. /g, '.')
    .slice(0, -1);
};

const initFetch = async () => {
  isInitialLoad.value = (await documentStore.initialFetch())
    ? 'false'
    : 'error';
};

onMounted(() => {
  initFetch();
});

const documentCards = computed(() => {
  return documentStore.getDocuments().map((document) => ({
    type: document.type,
    imageUrl: document.thumbnailUrl,
    docId: document.docId,
    title:
      document.type === 'MEMO'
        ? document.content.split('\n')[0]
        : document.title,
    summary: summary(
      document.type,
      document.status,
      document.content,
      document.summary,
    ),
    info: info(document.type, document.url, document.updatedAt),
  }));
});
</script>
