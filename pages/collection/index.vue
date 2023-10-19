<template>
  <div class="flex h-screen flex-col">
    <ModalsContainer />
    <TopBar />
    <div class="flex flex-grow">
      <SideNavigation :active-button="3" class="mt-20"> </SideNavigation>
      <div class="bg-[#F4F6F8] ml-48 mt-20 flex flex-grow">
        <div class="m-20 flex flex-grow flex-col">
          <div class="flex w-full justify-between flex-row">
            <p class="font-bold text-[32px]">컬렉션</p>
            <button
              v-if="collections.length > 0"
              class="flex items-center my-1 rounded-md bg-[#cce8ff] px-2 text-base font-medium text-[#1f8ce6]"
              @click="open"
            >
              추가하기
            </button>
          </div>
          <div v-if="collections.length === 0" class="flex flex-grow">
            <NoItemBox
              :discription="'등록된 컬렉션이 없어요'"
              :button-text="'새 컬렉션 만들기'"
              :open="open"
            />
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
          <ScrollTop />
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
