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
      <SideNavigation :active-button="'collection'" class="mt-20">
      </SideNavigation>
      <div class="bg-[#F4F6F8] mt-20 flex flex-grow">
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
            v-if="hasError"
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
          <div
            v-else-if="collections && collections.length === 0"
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
          <div
            ref="loadObserverTarget"
            class="bottom-0 -z-50 h-40 w-full -mt-40"
          ></div>
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
const hasError = ref(false);
const isEndOfCollections = computed(() => {
  return collectionStore.isEndOfCollections();
});

const loadObserverTarget = ref<HTMLElement | null>(null);
const loadObserver = ref<IntersectionObserver | null>(null);
const loadIntersection = ref(false);

onActivated(() => {
  initCollection();
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
          loadIntersection.value = true;
          fetchMore();
        } else {
          loadIntersection.value = false;
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );
  if (loadObserverTarget.value)
    loadObserver.value?.observe(loadObserverTarget.value);
};

const unsetObserver = () => {
  if (loadObserverTarget.value) loadObserver.value?.disconnect();
};

const initCollection = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  const res = await collectionStore.initalFetch();
  if (res === false) {
    hasError.value = true;
    isLoading.value = false;
    return;
  }
  collections.value = collectionStore.getCollections().map((collection) => {
    return {
      name: collection.name,
      description: collection.description,
      count: collection.count,
    };
  });
  isLoading.value = false;

  if (loadIntersection.value) fetchMore();
};

const fetchMore = async () => {
  if (isEndOfCollections.value || isLoading.value) return;
  isLoading.value = true;
  const res = await collectionStore.fetchCollectionsMore();
  if (res === false) {
    hasError.value = true;
    isLoading.value = false;
    return;
  }
  collections.value = collectionStore.getCollections().map((collection) => {
    return {
      name: collection.name,
      description: collection.description,
      count: collection.count,
    };
  });
  isLoading.value = false;

  if (loadIntersection.value) fetchMore();
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

const handleCollectionIsOpenUpdate = async (newIsOpen: boolean) => {
  isCollectionModalOpen.value = newIsOpen;
  await initCollection();
  collections.value = collectionStore.getCollections().map((collection) => {
    return {
      name: collection.name,
      description: collection.description,
      count: collection.count,
    };
  });
};
</script>
