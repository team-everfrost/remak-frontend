<template>
  <div class="flex">
    <div
      class="flex justify-center items-center h-14 w-14 rounded-full bg-white border border-[#e6e8eb]"
    >
      <img src="/assets/chat.svg" alt="채팅" />
    </div>
    <div
      class="ml-2 mt-8 justify-center rounded-tr-xl px-3 rounded-bl-xl rounded-br-xl border"
      :class="
        hasError
          ? 'bg-red-100 border-[#ff0000]'
          : 'bg-[#fefefe] border-[#e6e8eb]'
      "
    >
      <div v-if="text" class="prose max-w-96">
        <Markdown :source="text" />
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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  hasError?: boolean;
}>();

const errorMessage =
  '오류가 발생했어요. 다음과 같은 문제일 수 있어요.\n1. 네트워크 연결이 끊어졌어요.\n2. 서버에 문제가 생겼어요.\n3. 사용량 제한이 초과되었어요.';
</script>
