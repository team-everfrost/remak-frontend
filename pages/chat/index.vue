<template>
  <div>
    <TopBarApp />
    <div class="flex h-screen flex-col">
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="'chat'" class="mt-20"></SideNavigation>
        <main class="mt-20 flex flex-grow bg-[#F4F6F8]">
          <div class="flex flex-grow flex-col m-20">
            <div class="flex w-full justify-between">
              <p class="font-bold text-[32px]">채팅</p>
            </div>

            <div
              class="flex w-full h-full rounded-2xl bg-white border border-[#e6e8eb] mt-9 flex-col"
            >
              <div class="grow flex justify-start items-start gap-9 my-9 mx-10">
                <div v-if="!conversation.messages.length" class="grow flex">
                  <div
                    class="grow flex flex-col items-stretch gap-4 text-center"
                  >
                    <div
                      class="flex justify-center items-center h-14 w-14 rounded-full bg-white border border-[#e6e8eb] mx-auto"
                    >
                      <img src="/assets/chat.svg" alt="채팅" />
                    </div>
                    <p>궁금한 내용을 입력해주세요!</p>
                    <div>
                      <div
                        class="w-full flex-col justify-start items-start gap-6 inline-flex mt-4 px-32"
                      >
                        <div
                          class="w-full justify-between items-center inline-flex"
                        >
                          <div
                            class="text-neutral-900 text-xl font-bold shrink-0 leading-tight"
                          >
                            최근 대화
                          </div>
                          <button
                            class="px-1 py-2.5 justify-end items-center flex"
                            @click="clearHistory"
                          >
                            <div
                              class="text-center text-gray-500 text-xs font-medium shrink-0 underline leading-3"
                            >
                              전체 삭제
                            </div>
                          </button>
                        </div>
                        <div
                          class="w-full flex-col justify-start items-start gap-5 flex"
                        >
                          <div
                            v-for="entry in history"
                            :key="entry.chatId"
                            class="w-full flex"
                          >
                            <button
                              class="text-start text-slate-800 text-base font-normal grow"
                              @click="clickHistoryEntry(entry.chatId)"
                            >
                              <div class="line-clamp-1">
                                {{ entry.title }}
                              </div>
                            </button>
                            <button
                              class="w-5 h-5 shrink-0"
                              @click="deleteHistoryEntry(entry.chatId)"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 5L5 15M5 5L15 15"
                                  stroke="#28323C"
                                  stroke-width="1.66667"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="grow flex flex-col gap-9">
                  <template v-for="(message, index) in conversation.messages">
                    <template v-if="message.type === 'user'">
                      <div :key="index" class="flex w-full justify-end">
                        <ChatUser :text="message.message || ''" />
                      </div>
                    </template>
                    <template v-else-if="message.type === 'assistant'">
                      <div :key="index" class="flex w-full justify-start">
                        <ChatAssistant
                          :text="message.message || ''"
                          :has-error="message.hasError"
                        />
                      </div>
                    </template>
                  </template>
                </div>
              </div>

              <div
                class="sticky bottom-0 flex items-end content-center mx-10 pb-9 gap-2 bg-white"
              >
                <div v-show="conversation.messages.length">
                  <button
                    class="w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-200"
                    @click="resetChat"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="w-6 h-6 mx-auto"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                      />
                      <path
                        d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                      />
                    </svg>
                  </button>
                </div>
                <textarea
                  ref="chatInput"
                  v-model="query"
                  class="flex px-4 py-2.5 resize-none h-12 items-center flex-grow rounded-lg bg-[#f4f6f8] border border-[#e6e8eb] placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:border-[#1f8ce6]"
                  type="text"
                  rows="1"
                  maxlength="500"
                  autocomplete="off"
                  placeholder="궁금하신 내용을 입력해주세요"
                  @input="onInput"
                  @keydown.enter.exact.prevent
                  @keyup.enter.exact="onEnter"
                />
                <button
                  class="flex items-center justify-center h-12 w-20 rounded-lg text-sm"
                  :class="
                    isLoading
                      ? 'cursor-progress'
                      : query.trim()
                      ? 'text-white bg-remak-blue'
                      : 'text-[#646f7c] bg-[#E0E0E0]'
                  "
                  :disabled="isLoading"
                  @click="onEnter"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '~/stores/chat';

const query = ref('');
const question = ref('');
const isLoading = ref(false);
const chatInput = ref<HTMLTextAreaElement | null>(null);

const router = useRouter();
const chatStore = useChatStore();

const conversation = computed(() => useChatStore().currentConversation);

const history = computed(() => chatStore.getChatHistories().slice().reverse());

onActivated(() => {
  if (router.currentRoute.value.query.chatId) {
    chatStore.restoreConversation(
      router.currentRoute.value.query.chatId as string,
    );
  } else chatStore.resetChat();
  chatInput.value?.focus();
});

watch(
  () => router.currentRoute.value.query.chatId,
  (newChatId) => {
    if (newChatId) {
      chatStore.restoreConversation(newChatId as string);
    } else {
      chatStore.resetChat();
    }
  },
);

const onInput = (event: Event) => {
  query.value = (event.target as HTMLInputElement).value;
  if (!chatInput.value) return;
  chatInput.value.style.height = 'auto';
  chatInput.value.style.height =
    (chatInput.value.scrollHeight + 5 < 100
      ? chatInput.value.scrollHeight + 5
      : 100) + 'px';
};

const onEnter = async () => {
  if (!query.value.trim()) return;
  if (isLoading.value) return;

  question.value = query.value.trim();

  query.value = '';
  if (chatInput.value) {
    chatInput.value.style.height = '48px';
    chatInput.value?.focus();
  }
  isLoading.value = true;

  watch(
    () => {
      // 메시지 배열의 길이가 0보다 크면 마지막 메시지를 반환, 그렇지 않으면 null 반환
      return conversation.value.messages.length > 0
        ? [
            conversation.value.messages.length,
            conversation.value.messages[conversation.value.messages.length - 1]
              .message,
          ]
        : null;
    },
    (newMessage, oldMessage) => {
      if (newMessage && newMessage !== oldMessage) {
        nextTick(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
      }
    },
  );

  if (conversation.value.messages.length === 0)
    await chatStore.startChat(question.value);
  else await chatStore.continueChat(question.value);

  router.push({
    query: {
      chatId: conversation.value.chatId,
    },
  });

  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  isLoading.value = false;
};

const clearHistory = () => {
  chatStore.clearChatHistory();
};

const clickHistoryEntry = (entry: string) => {
  chatStore.restoreConversation(entry);

  router.push({
    query: {
      chatId: entry,
    },
  });

  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
};

const deleteHistoryEntry = (entry: string) => {
  chatStore.deleteChatHistory(entry);
};

const resetChat = () => {
  chatStore.resetChat();
  router.push({});
  nextTick(() => {
    window.scrollTo(0, 0);
  });
};
</script>
