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

          <div v-if="documents.length === 0" class="flex flex-grow">
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
import { useTagStore } from '~/stores/tag';

const route = useRoute();
const tagStore = useTagStore();

const tagName = route.params.tagName as string;
const documents = ref([] as any[]);

const initalFetch = async () => {
  const result = await tagStore.fetchTagDetail(tagName);
  if (result) {
    documents.value = cardParser(result);
  }
};

onMounted(() => {
  initalFetch();
});
</script>
