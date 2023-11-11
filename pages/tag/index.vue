<template>
  <div class="flex min-h-screen flex-col">
    <ModalAddModal
      :is-open="isModalOpen"
      @update:is-open="handleIsOpenUpdate"
    />
    <TopBarApp />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="'tag'" class="mt-20"> </SideNavigation>

      <div class="w-full bg-[#F4F6F8] flex grow mt-20">
        <div class="m-20 flex flex-col grow">
          <div class="flex w-full justify-between">
            <p class="font-bold text-[32px]">태그</p>
          </div>

          <div
            v-if="!tagNotExists"
            class="flex h-[56px] w-full flex-row mt-9 items-center rounded-xl bg-white border border-[#e6e8eb]"
          >
            <img class="pl-4" src="~/assets/search.svg" alt="검색" />
            <input
              v-model="searchQuery"
              type="text"
              class="w-full h-full text-[#646f7c] text-base font-medium outline-none mx-2"
              placeholder="태그를 검색해보세요"
              @input="onInput"
              @keyup.esc="queryClear"
            />
            <button v-show="searchQuery" class="pr-4" @click="queryClear">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#28323C"
                  stroke="#28323C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M9 9L12 12L15 15" fill="white" />
                <path
                  d="M9 9L12 12L15 15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M15 9L12 12L9 15" fill="white" />
                <path
                  d="M15 9L12 12L9 15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div v-if="tagNotExists && !isLoading" class="flex flex-grow">
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
import { useTagStore } from '~/stores/tag';

const tagStore = useTagStore();
const searchQuery = ref('');
const isLoading = ref(true);
const isEndOfTags = computed(() => {
  return tagStore.isEndOfTags();
});
const tagNotExists = ref(false);

const tags = ref<
  {
    name: string;
    count: number;
  }[]
>([]);

const loadObserverTarget = ref<HTMLElement | null>(null);
const loadObserver = ref<IntersectionObserver | null>(null);
const loadIntersection = ref(false);

onActivated(() => {
  if (!searchQuery || !searchQuery.value) inital();
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
          fetchTagsMore();
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

const onInput = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value;
  tagSearch(searchQuery.value);
};

const queryClear = () => {
  searchQuery.value = '';
  tagSearch(searchQuery.value);
};

const inital = async () => {
  isLoading.value = true;
  await tagStore.cleanFetch();
  tags.value = tagStore.getTags().map((tag) => {
    return {
      name: tag.name,
      count: tag.count,
    };
  });
  if (!tags.value.length) tagNotExists.value = true;
  else tagNotExists.value = false;
  isLoading.value = false;

  if (loadIntersection.value) fetchTagsMore();
};

const tagSearch = useDebounceFn(
  async (query) => {
    isLoading.value = true;
    const result = await tagStore.cleanFetch(query?.trim());
    tags.value = result.map((tag: any) => {
      return {
        name: tag.name,
        count: tag.count,
      };
    });
    isLoading.value = false;
  },
  300,
  { maxWait: 1000 },
);

const fetchTagsMore = async () => {
  if (isEndOfTags.value || isLoading.value) return;
  isLoading.value = true;
  const result = await tagStore.fetchMore(searchQuery.value.trim());
  tags.value.push(
    ...result.map((tag: any) => {
      return {
        name: tag.name,
        count: tag.count,
      };
    }),
  );
  isLoading.value = false;

  if (loadIntersection.value) fetchTagsMore();
};

const isModalOpen = ref(false);

const handleIsOpenUpdate = (value: boolean) => {
  isModalOpen.value = value;
};
</script>
