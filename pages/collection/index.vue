<template>
  <div class="flex min-h-screen flex-col">
    <ModalsContainer />
    <TopBar />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="3" class="mt-20"> </SideNavigation>
      <div class="bg-[#F4F6F8] ml-48 flex-col items-start mt-20 w-full">
        <div class="mx-20">
          <div class="flex w-full justify-between flex-row mt-20">
            <p class="font-bold text-[32px]">컬렉션</p>
            <button
              v-if="collections.length > 0"
              class="flex items-center my-1 rounded-md bg-[#cce8ff] px-2 text-base font-medium text-[#1f8ce6]"
              @click="open"
            >
              추가하기
            </button>
          </div>
          <div
            v-if="collections.length === 0"
            class="flex w-full justify-center mt-32 flex-col items-center mb-40"
          >
            <img src="~/assets/empty_box.svg" alt="컬렉션" />
            <p class="text-lg text-center text-[#646f7c] mt-6">
              등록된 컬렉션이 없어요
            </p>
            <button
              class="flex justify-center items-center px-7 py-4 rounded-xl border border-[#e6e8eb] bg-white mt-4"
              @click="open"
            >
              새 컬렉션 만들기
            </button>
          </div>
          <div
            v-else
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-9 mb-9"
          >
            <CollectionCard
              v-for="(collection, index) in collections"
              :key="index"
              :name="collection.name"
              :description="collection.description"
              :count="collection.count"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal';
import AddCollection from '~/components/AddCollection.vue';
import { useCollectionStore } from '~/stores/collection';

const collectionStore = useCollectionStore();

onMounted(() => {
  collectionStore.initalFetch();
});

const collections = computed(() => {
  return collectionStore.getCollections().map((collection) => {
    return {
      name: collection.name,
      description: collection.description,
      count: collection.count,
    };
  });
});

const { open, close } = useModal({
  component: AddCollection,
  attrs: {
    onConfirm() {
      close();
    },
    onCancel() {
      close();
    },
  },
});
</script>
