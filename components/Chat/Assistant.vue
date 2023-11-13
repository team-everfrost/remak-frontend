<template>
  <div class="flex">
    <div
      class="flex justify-center items-center h-14 w-14 rounded-full bg-white border border-[#e6e8eb]"
    >
      <img src="/assets/chat.svg" alt="채팅" />
    </div>
    <div class="ml-2 mt-8 flex flex-col gap-2 max-w-xl">
      <div
        class="justify-center rounded-tr-xl px-3 rounded-bl-xl rounded-br-xl border"
        :class="
          hasError
            ? 'bg-red-100 border-[#ff0000]'
            : 'bg-[#fefefe] border-[#e6e8eb]'
        "
      >
        <div v-if="text" class="prose max-w-none">
          <Markdown :source="text" />
          <button @click="isOpened = !isOpened">
            <div
              v-if="!isOpened"
              class="text-sm text-gray-500 inline-flex items-center gap-2"
            >
              <div>참고자료 열기</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="h-4 w-4"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <div
              v-else
              class="text-sm text-gray-500 inline-flex items-center gap-2"
            >
              <div>참고자료 접기</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="h-4 w-4"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            </div>
          </button>
        </div>
        <div v-else-if="hasError">
          <p class="text-sm text-red-500 whitespace-pre-wrap my-4">
            {{ errorMessage }}
          </p>
        </div>
        <div v-else>
          <div class="flex w-32 h-16 items-center justify-center">
            <div class="flex mx-auto space-x-2">
              <div
                class="animate-[pulse_1s_0.1s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] w-3 h-3 rounded-full bg-gray-400"
              ></div>
              <div
                class="animate-[pulse_1s_0.2s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] w-3 h-3 rounded-full bg-gray-400"
              ></div>
              <div
                class="animate-[pulse_1s_0.3s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] w-3 h-3 rounded-full bg-gray-400"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="documents && documents.length > 0" v-auto-animate class="">
        <div v-if="isOpened" class="flex flex-col gap-2">
          <div v-for="document in documents" :key="document.docId">
            <NuxtLink :to="'/view/' + document.docId" target="_blank">
              <div
                class="flex h-24 rounded-xl border bg-[#fefefe] border-[#e6e8eb]"
              >
                <div class="px-4 py-2">
                  <div class="text-md font-bold line-clamp-1 break-all">
                    {{
                      cardTitle(
                        document.type,
                        document.content,
                        document.title,
                        document.url,
                      )
                    }}
                  </div>
                  <div class="text-sm font-normal line-clamp-3 break-all">
                    {{
                      cardSummary(
                        document.type,
                        document.status,
                        document.content,
                        document.summary,
                      )
                    }}
                  </div>
                </div>
                <div class="ml-auto w-40 shrink-0 bg-[#F4F6F8] rounded-t-2xl">
                  <img
                    v-if="document.type !== 'MEMO'"
                    sizes="100vw"
                    class="object-cover h-full w-full mx-auto"
                    :src="document.thumbnailUrl || '/image/imageHolder.svg'"
                    :alt="document.title || 'image placeholder'"
                    placeholder="~/assets/imageHolder.svg"
                    loading="lazy"
                    onerror="this.onerror = null; this.src = '/image/imageHolder.svg';"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document } from '~/stores/document';

defineProps<{
  text: string;
  documents?: Document[];
  hasError?: boolean;
}>();

const isOpened = ref(false);

const errorMessage =
  '오류가 발생했어요. 다음과 같은 문제일 수 있어요.\n1. 네트워크 연결이 끊어졌어요.\n2. 서버에 문제가 생겼어요.\n3. 사용량 제한이 초과되었어요.';
</script>
