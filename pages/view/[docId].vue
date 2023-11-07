<template>
  <div>
    <div class="flex h-screen flex-col">
      <TopBar :is-fixed="false" />
      <div class="flex flex-grow">
        <div
          class="pt-20 w-full bg-[#f4f6f8] flex-col justify-center items-center"
        >
          <div class="flex pt-20 flex-col justify-center items-center pb-16">
            <div class="flex flex-col w-full max-w-[995px]">
              <div ref="backBtn" class="flex justify-start items-center w-full">
                <button
                  class="flex flex-row justify-start items-center h-8 mb-6 pl-2 pr-4 rounded-lg hover:bg-[#e9ecef]"
                  @click="goBack"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="#1F8CE6"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <p
                    class="text-sm font-medium text-center ml-2 text-[#1f8ce6]"
                  >
                    이전으로 돌아가기
                  </p>
                </button>
              </div>
              <div class="w-full">
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
                <div v-else-if="isLoading">
                  <ViewSkeletonDetail />
                </div>
                <div v-else class="relative">
                  <div
                    v-show="!backIntersection"
                    class="sticky top-0 left-0 z-10 flex justify-start items-center w-full -mb-10 lg:-ml-10"
                  >
                    <button
                      class="flex flex-row justify-start items-center p-2 rounded-lg hover:bg-[#e9ecef]"
                      @click="goBack"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          d="M12.5 15L7.5 10L12.5 5"
                          stroke="#1F8CE6"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <ViewDetail
                    :document="document"
                    @should-fetch="initialFetch"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocumentStore } from '~/stores/document';

const route = useRoute();
const router = useRouter();
const documentStore = useDocumentStore();

const docId = route.params.docId as string;
const isLoading = ref(true);
const hasError = computed(() => {
  if (document.value === false) return true;
  return false;
});
const document = ref({} as any);

const backBtn = ref<HTMLButtonElement | null>(null);
const backBtnObserver = ref<IntersectionObserver | null>(null);
const backIntersection = ref(true);

onActivated(() => {
  setObserver();
  initialFetch();
});

onDeactivated(() => {
  unsetObserver();
});

const initialFetch = async () => {
  isLoading.value = true;
  document.value = await documentStore.fetchDocumentDetail(docId);
  if (
    (document.value.status === 'SCRAPE_PENDING' ||
      document.value.status === 'SCRAPE_PROCESSING' ||
      (document.value.status === 'EMBED_PENDING' &&
        document.value.type !== 'MEMO') ||
      document.value.status === 'EMBED_PROCESSING') &&
    new Date().getTime() - new Date(document.value.updatedAt).getTime() <
      43200000
  ) {
    autoReload();
  }
  isLoading.value = false;
};

let autoReloadInterval: any = null;

const autoReload = () => {
  autoReloadInterval = setInterval(async () => {
    document.value = await documentStore.fetchDocumentDetail(docId);
    if (
      !(
        (document.value.status === 'SCRAPE_PENDING' ||
          document.value.status === 'SCRAPE_PROCESSING' ||
          (document.value.status === 'EMBED_PENDING' &&
            document.value.type !== 'MEMO') ||
          document.value.status === 'EMBED_PROCESSING') &&
        new Date().getTime() - new Date(document.value.updatedAt).getTime() <
          43200000
      )
    ) {
      clearInterval(autoReloadInterval);
    }
  }, 2000);
};

const setObserver = () => {
  if (!backBtnObserver.value)
    backBtnObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          backIntersection.value = true;
        } else {
          backIntersection.value = false;
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );
  if (backBtn.value) backBtnObserver.value?.observe(backBtn.value);
};

const unsetObserver = () => {
  if (backBtn.value) backBtnObserver.value?.disconnect();
};

const goBack = () => {
  const historyLengthBefore = window.history.length;

  router.back();

  nextTick(() => {
    const historyLengthAfter = window.history.length;
    if (historyLengthBefore === historyLengthAfter) {
      router.push('/main');
    }
  });
};
</script>
