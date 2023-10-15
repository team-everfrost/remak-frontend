<template>
  <div class="flex h-screen flex-col">
    <ModalsContainer />
    <TopBar />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="2" class="mt-20"> </SideNavigation>
      <div class="w-full bg-[#F4F6F8] ml-48 flex-col items-start mt-20">
        <div class="mx-20">
          <div class="flex w-full justify-between flex-row mt-20">
            <p class="font-bold text-[32px]">태그</p>
          </div>
          <div
            v-if="tags.length === 0"
            class="flex w-full justify-center mt-32 flex-col items-center mb-40"
          >
            <img src="~/assets/empty_box.svg" alt="컬렉션" />
            <p class="text-lg text-center text-[#646f7c] mt-6">
              태그가 없습니다
            </p>
          </div>
          <div
            v-else
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-9 mb-9"
          >
            <TagCard
              v-for="(tag, index) in tags"
              :key="index"
              :name="tag.name"
              :count="tag.count"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTagStore } from '~/stores/tag';

const tagStore = useTagStore();
onMounted(() => {
  tagStore.initalFetch();
});
const tags = computed(() => {
  return tagStore.getTags().map((tag) => {
    return {
      name: tag.name,
      count: tag.count,
    };
  });
});
</script>
