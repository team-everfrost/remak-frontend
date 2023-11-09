<template>
  <div>
    <TopBarApp />
    <div class="flex h-screen flex-col">
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="1" class="mt-20"></SideNavigation>
        <main class="mt-20 flex flex-grow bg-[#F4F6F8] ml-48">
          <div class="flex flex-grow flex-col m-20">
            <div>
              <button
                class="flex flex-row justify-start items-center h-8 pl-2 pr-4 rounded-lg hover:bg-[#e9ecef]"
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
                <p class="text-sm font-medium text-center ml-2 text-[#1f8ce6]">
                  이전으로 돌아가기
                </p>
              </button>
            </div>

            <div
              class="flex w-full h-full rounded-2xl bg-white border border-[#e6e8eb] mt-3 flex-col"
            >
              <div
                class="grow flex flex-col justify-start items-start gap-9 my-9 mx-10"
              >
                <div
                  v-if="!conversation.length"
                  class="flex flex-col mx-auto items-center gap-4 text-center"
                >
                  <div
                    class="flex justify-center items-center h-14 w-14 rounded-full bg-white border border-[#e6e8eb]"
                  >
                    <img src="/assets/chat.svg" alt="채팅" />
                  </div>
                  <p>궁금한 내용을 입력해주세요!</p>
                  <div>
                    <!-- <p>최근 기록</p> -->
                  </div>
                </div>
                <template v-for="(message, index) in conversation">
                  <template v-if="message.type === 'user'">
                    <div :key="index" class="flex w-full justify-end">
                      <ChatUser :text="message.text" />
                    </div>
                  </template>
                  <template v-else-if="message.type === 'assistant'">
                    <div :key="index" class="flex w-full justify-start">
                      <ChatAssistant
                        :text="message.text"
                        :has-error="message.hasError"
                      />
                    </div>
                  </template>
                </template>
              </div>

              <div class="flex items-end bottom-0 content-end h-12 mx-10 mb-9">
                <input
                  v-model="query"
                  class="flex px-4 items-center flex-grow h-12 rounded-lg bg-[#f4f6f8] border border-[#e6e8eb] placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:border-[#1f8ce6]"
                  type="text"
                  placeholder="궁금하신 내용을 입력해주세요"
                  @input="onInput"
                  @keyup.enter="onEnter"
                />
                <button
                  class="flex items-center justify-center h-12 w-20 rounded-lg text-sm ml-2"
                  :class="
                    isLoading
                      ? 'cursor-progress'
                      : query
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
const currentAnswer = computed(() => {
  return chatStore.lastMessage;
});

const conversation = ref<
  {
    type: 'user' | 'assistant';
    text: string;
    hasError: boolean;
  }[]
>([]);

const chatStore = useChatStore();

onActivated(() => {
  conversation.value = [];
});

const onInput = (event: Event) => {
  query.value = (event.target as HTMLInputElement).value;
};

const onEnter = async () => {
  if (!query.value) return;
  if (isLoading.value) return;

  question.value = query.value;
  conversation.value.push({
    type: 'user',
    text: query.value,
    hasError: false,
  });

  query.value = '';
  isLoading.value = true;

  // 현재 수신중인 currentAnswer를 conversation에 반영
  conversation.value.push({
    type: 'assistant',
    text: '문서를 찾아보고 있어요!',
    hasError: false,
  });

  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  chatStore.resetChat();

  watch(
    () => chatStore.lastMessage,
    (value) => {
      if (value) {
        conversation.value[conversation.value.length - 1] = {
          type: 'assistant',
          text: value,
          hasError: false,
        };
        nextTick(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
      }
    },
  );

  const status = await chatStore.startChat(question.value);

  // 수신 완료된 currentAnswer를 conversation에 반영
  if (currentAnswer.value) {
    conversation.value[conversation.value.length - 1] = {
      type: 'assistant',
      text: currentAnswer.value,
      hasError: false,
    };
    nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  if (!status) {
    conversation.value[conversation.value.length - 1] = {
      type: 'assistant',
      text: '오류가 발생했어요. 다음과 같은 문제일 수 있어요.\n1. 네트워크 연결이 끊어졌어요.\n2. 서버에 문제가 생겼어요.\n3. 사용량 제한이 초과되었어요.',
      hasError: true,
    };
    nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
  isLoading.value = false;
};
</script>
