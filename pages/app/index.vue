<template>
  <div class="flex h-screen flex-col">
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
          <div class="">
            <div
              class="sticky text-neutral-900 text-2xl font-bold leading-normal mb-7"
            >
              오늘
            </div>
            <MasonryWall :items="documentCards" :column-width="258" :gap="16">
              <template #default="{ item }">
                <MainDocumentCard
                  :type="item.type"
                  :image-url="item.imageUrl"
                  :url="item.url"
                  :title="item.title"
                  :summary="item.summary"
                  :date="item.date"
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
import { useDocumentStore } from '~/stores/document';

defineComponent({
  components: {
    MasonryWall,
  },
});

const documentStore = useDocumentStore();

const summary = (
  type: string,
  status: string,
  content: string,
  summary: string,
) => {
  return type === 'MEMO' ? content : summary;
};

onMounted(() => {
  documentStore.reset();
  documentStore.getDocument();
});

const documentCards = computed(() => {
  return documentStore.documents.map((document) => ({
    type: document.type,
    imageUrl: document.thumbnailUrl,
    url: '/' + document.docId,
    title: document.title,
    summary: summary(
      document.type,
      document.status,
      document.content,
      document.summary,
    ),
    date: Date.parse(document.createdAt).toLocaleString('ko-KR'),
  }));
});
</script>
