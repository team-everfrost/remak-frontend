<template>
  <div class="flex min-h-screen flex-col">
    <TopBar />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="2" class="mt-20"> </SideNavigation>

      <div class="w-full bg-[#F4F6F8] ml-48 flex grow mt-20">
        <div class="m-20 flex flex-col grow">
          <div class="flex w-full justify-between">
            <p class="font-bold text-[32px]">태그</p>
          </div>

          <div
            v-if="isTagExists"
            class="flex h-[56px] w-full flex-row mt-9 px-4 items-center rounded-xl bg-white border border-[#e6e8eb]"
          >
            <img src="~/assets/icons/icon_search.svg" alt="검색" />
            <input
              v-model="search"
              type="text"
              class="w-full h-full text-[#646f7c] text-base font-medium outline-none"
              placeholder="태그를 검색해보세요"
              @input="onInput"
            />
          </div>
          <div v-if="!isTagExists" class="flex flex-grow">
            <NoItemBox :discription="'등록된 태그가 없어요'" />
          </div>

          <div
            class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-9 mb-9"
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
const search = ref('');
onMounted(() => {
  tagStore.initalFetch();
});

const tagSearch = async (query: string) => {
  await tagStore.fetchTags(query);
};

const isTagExists = computed(() => {
  return tagStore.isTagExists;
});

const onInput = (event: Event) => {
  const currentInput = event.target as HTMLInputElement;
  tagSearch(currentInput.value);
};

const tags = computed(() => {
  return tagStore.getTags().map((tag) => {
    return {
      name: tag.name,
      count: tag.count,
    };
  });
});
</script>
