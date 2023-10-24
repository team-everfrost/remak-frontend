<template>
  <div class="flex h-screen flex-col">
    <ModalAddModal
      :is-open="isModalOpen"
      @update:is-open="handleIsOpenUpdate"
    />
    <AddCollection
      :is-open="isCollectionModalOpen"
      @update:is-open="handleCollectionIsOpenUpdate"
    />
    <TopBarApp />
    <div class="flex flex-grow">
      <SideNavigation :active-button="3" class="mt-20"> </SideNavigation>
      <div class="bg-[#F4F6F8] ml-48 mt-20 flex flex-grow">
        <div class="m-20 flex flex-grow flex-col">
          <div class="flex w-full justify-between flex-row">
            <p class="font-bold text-[32px]">컬렉션</p>
            <button
              v-if="collections && collections.length > 0"
              class="flex items-center my-1 rounded-md bg-[#cce8ff] px-2 text-base font-medium text-[#1f8ce6]"
              @click="openCollectionModal"
            >
              추가하기
            </button>
          </div>
          <div
            v-if="collections && collections.length === 0"
            class="flex flex-grow"
          >
            <NoItemBox
              :discription="'등록된 컬렉션이 없어요'"
              :button-text="'새 컬렉션 만들기'"
              :open="openCollectionModal"
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
import AddCollection from '~/components/AddCollection.vue';
import { useCollectionStore } from '~/stores/collection';

const collectionStore = useCollectionStore();
const collections = ref<any[]>();
const isLoading = ref(false);

onActivated(() => {
  initCollection();
});

const initCollection = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  await collectionStore.initalFetch();
  collections.value = collectionStore.getCollections().map((collection) => {
    return {
      name: collection.name,
      description: collection.description,
      count: collection.count,
    };
  });
  isLoading.value = false;
};

const isModalOpen = ref(false);

const handleIsOpenUpdate = (value: boolean) => {
  isModalOpen.value = value;
};

const isCollectionModalOpen = ref(false);

// 모달을 열기 위해 이 함수를 호출합니다
const openCollectionModal = () => {
  isCollectionModalOpen.value = true;
};

const handleCollectionIsOpenUpdate = (newIsOpen: boolean) => {
  isCollectionModalOpen.value = newIsOpen;
};
</script>
