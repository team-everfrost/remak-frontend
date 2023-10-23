<template>
  <div>
    <div class="flex h-screen flex-col">
      <TopBar :is-fixed="false" />
      <div class="flex flex-grow">
        <div
          class="mt-20 w-full bg-[#f4f6f8] flex-col justify-center items-center"
        >
          <div class="flex mt-20 flex-col justify-center items-center mb-16">
            <div class="flex flex-col w-full max-w-[995px]">
              <div class="flex justify-start items-center w-full">
                <button
                  class="flex flex-row justify-start items-center h-8 pl-2 pr-4"
                  @click="$router.back()"
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
              <div class="mt-[24px] w-full">
                <div v-if="!hasError">
                  문서를 불러오는데 오류가 발생했습니다.
                </div>
                <div v-else-if="isLoading">
                  <ViewSkeletonDetail />
                </div>
                <div v-else>
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
const documentStore = useDocumentStore();

const docId = route.params.docId as string;
const isLoading = ref(true);
const hasError = computed(() => {
  if (document.value === false) return false;
  return true;
});
const document = ref({} as any);

const initialFetch = async () => {
  document.value = await documentStore.fetchDocumentDetail(docId);
  isLoading.value = false;
};

onMounted(() => {
  initialFetch();
});
</script>
