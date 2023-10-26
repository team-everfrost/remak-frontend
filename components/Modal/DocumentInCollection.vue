<template>
  <HeadlessTransitionRoot appear :show="isOpen" as="template">
    <HeadlessDialog as="div" class="relative z-50" @close="closeModal">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="flex w-full max-w-[480px] max-h-[480px] overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <div class="flex flex-col bg-white w-full h-full">
                <div
                  class="flex flex-row items-center justify-between pl-5 pr-3 pt-5 mb-10"
                >
                  <p
                    ref="popupName"
                    class="leading-18 text-lg font-bold text-[#1b1c1f]"
                  >
                    컬렉션에 등록
                  </p>
                  <button @click="closeModal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="relative h-6 w-6"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="#28323C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div class="flex w-full flex-col overflow-y-auto max-h-72">
                  <button
                    v-for="(collection, index) in collectionsList"
                    :key="index"
                    class="flex h-11 flex-row items-center justify-between shrink-0 pl-5 pr-3 mx-1"
                    @click="collection.isSelected = !collection.isSelected"
                  >
                    <p
                      class="leading-18 text-sm font-bold text-neutral-900 line-clamp-1 break-all"
                    >
                      {{ collection.name }}
                    </p>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="relative h-5 w-5 flex-shrink-0 flex-grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g clip-path="url(#clip0_27_4217)">
                        <path
                          d="M9.99984 18.3332C14.6023 18.3332 18.3332 14.6023 18.3332 9.99984C18.3332 5.39734 14.6023 1.6665 9.99984 1.6665C5.39734 1.6665 1.6665 5.39734 1.6665 9.99984C1.6665 14.6023 5.39734 18.3332 9.99984 18.3332Z"
                          :fill="collection.isSelected ? '#1F8CE6' : '#C5C8CE'"
                          :stroke="
                            collection.isSelected ? '#1F8CE6' : '#C5C8CE'
                          "
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M7.5 10.0002L9.16667 11.6668L12.5 8.3335"
                          stroke="white"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_27_4217">
                          <rect width="20" height="20" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <div
                    ref="loadObserverTarget"
                    class="bottom-0 -z-50 h-40 w-full -mt-40"
                  ></div>
                </div>

                <div
                  v-if="collectionsList.length === 0"
                  class="relative flex flex-col items-center justify-start gap-6 mt-9"
                >
                  <svg
                    width="108"
                    height="108"
                    viewBox="0 0 108 108"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="relative h-[108px] w-[108px] flex-shrink-0 flex-grow-0"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g clip-path="url(#clip0_27_4357)">
                      <path
                        d="M50.0936 21V53.7743L37.2924 61.2426L32.9355 63.7785L16.6055 73.3048V40.5305L32.9355 31.0042L37.2924 28.4683L50.0936 21Z"
                        fill="#CDCDCD"
                      ></path>
                      <g style="mix-blend-mode: multiply">
                        <path
                          d="M50.0938 92.8351L69.4007 95.8357L103 72.9129L87.4656 63.9642L83.8118 63.1875L50.0938 92.8351Z"
                          fill="#CDCDCD"
                        ></path>
                      </g>
                      <path
                        d="M33.3495 50.2955L28.9992 47.7596L16.6055 40.5303V73.3046L28.9992 80.5273L33.3495 83.0698L50.0936 92.835V60.0607L33.3495 50.2955Z"
                        fill="#F1F3F4"
                      ></path>
                      <path
                        d="M66.8378 30.7652L62.4875 28.2227L50.0938 21V53.7743L62.4875 60.997L66.8378 63.5395L83.5818 73.3048V40.5305L66.8378 30.7652Z"
                        fill="#EDEFF0"
                      ></path>
                      <path
                        d="M83.5818 40.5303V73.3046L70.7741 80.7729L66.4238 83.3088L50.0938 92.835V60.0607L66.4238 50.5345L70.7741 47.9986L83.5818 40.5303Z"
                        fill="#DCDEDF"
                      ></path>
                      <path
                        d="M33.3483 50.2957V83.07L28.998 80.5274V47.7598L33.3483 50.2957Z"
                        fill="#B9BFC1"
                      ></path>
                      <path
                        d="M83.1143 41.6791L50.7039 60.5855C50.6185 60.632 50.5527 60.6054 50.5527 60.5191C50.5527 60.4328 50.6185 60.3266 50.7039 60.2802L83.1143 41.3737C83.1997 41.3272 83.2654 41.3538 83.2654 41.4401C83.2654 41.5264 83.1997 41.6326 83.1143 41.6791Z"
                        fill="#8F6E4F"
                      ></path>
                      <path
                        d="M70.7741 47.999V80.7733L66.4238 83.3092V50.5349L70.7741 47.999Z"
                        fill="#B9BFC1"
                      ></path>
                      <path
                        d="M16.6052 40.5303L29.1172 47.8326L33.4741 50.3685L50.0933 60.0607L38.4881 76.4512L5 56.9141L16.6052 40.5303Z"
                        fill="#F5F6F7"
                      ></path>
                      <path
                        d="M50.0938 21L62.4875 26.8817L95.9756 46.4122L83.5818 40.5305L50.0938 21Z"
                        fill="#F5F6F7"
                      ></path>
                      <path
                        d="M50.0933 21L38.4881 26.6029L5 46.1334L16.6052 40.5305L50.0933 21Z"
                        fill="#F5F6F7"
                      ></path>
                      <path
                        d="M83.5818 40.5303L71.0698 47.8326L66.7195 50.3685H66.7129L50.0938 60.0608L62.0538 75.1766L95.5419 55.6461L83.5818 40.5303Z"
                        fill="#F5F6F7"
                      ></path>
                      <path
                        d="M50.0926 53.7744L55.4352 56.8879L50.0926 60.0611L44.75 56.8879L50.0926 53.7744Z"
                        fill="#C4C2BF"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_27_4357">
                        <rect
                          width="98"
                          height="74.8358"
                          fill="white"
                          transform="translate(5 21)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <p
                    class="flex-shrink-0 flex-grow-0 text-center text-sm text-[#646f7c]"
                  >
                    등록된 컬렉션이 없어요
                  </p>
                </div>
                <button
                  class="h-[52px] text-center justify-center items-center rounded-xl bg-[#1f8ce6] text-white mx-5 mt-9 mb-5"
                  @click="handleClick"
                >
                  확인
                </button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { useCollectionStore } from '~/stores/collection';

const collectionStore = useCollectionStore();

const computedCollections = computed(() => {
  return collectionStore.getCollections().map((collection) => {
    return {
      name: collection.name,
      description: collection.description,
      count: collection.count,
      isSelected: false,
    };
  });
});

const collectionsList = ref<
  { name: string; description: string; count: number; isSelected: boolean }[]
>([]);

const isEndOfCollections = computed(() => {
  return collectionStore.isEndOfCollections();
});

const popupName = ref<HTMLElement | null>(null);
const popupObserver = ref<ResizeObserver | null>(null);

const loadObserverTarget = ref<HTMLElement | null>(null);
const loadObserver = ref<IntersectionObserver | null>(null);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      // init();
      nextTick(() => {
        setObserver();
      });
    } else {
      unsetObserver();
    }
  },
);

const setObserver = () => {
  if (!popupObserver.value)
    popupObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          init();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );
  if (popupName.value) popupObserver.value?.observe(popupName.value);

  if (!loadObserver.value)
    loadObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
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
  if (popupName.value) popupObserver.value?.disconnect();
  if (loadObserverTarget.value) loadObserver.value?.disconnect();
};

const init = async () => {
  await collectionStore.initalFetch();
  collectionsList.value = computedCollections.value;
};

const fetchMore = async () => {
  if (isEndOfCollections.value) return;
  await collectionStore.fetchCollectionsMore();
  collectionsList.value = computedCollections.value;
};

const handleClick = () => {
  collectionsList.value.forEach((collection) => {
    if (collection.isSelected) {
      collectionStore.addDocInCollection(collection.name, props.docId);
    }
  });
  closeModal();
};

// Define the props
const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    docId: string[];
  }>(),
  {
    isOpen: false,
    docId: () => [],
  },
);

// Define the emits
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void;
}>();

// Update the 'closeModal' function to emit the updated 'isOpen' value
const closeModal = () => {
  collectionsList.value.forEach((collection) => {
    collection.isSelected = false;
  });
  emit('update:isOpen', false);
};
</script>
