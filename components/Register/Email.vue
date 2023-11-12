<template>
  <div
    class="flex min-h-screen flex-col items-center bg-remak-background-gray pt-36"
  >
    <div class="mb-4 text-2xl font-bold">
      <span class="text-gray-800">회원가입</span>
    </div>
    <div
      class="flex min-h-[300px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
    >
      <div
        class="text-netural-900 items-start text-left text-sm font-medium leading-[14px]"
      >
        이메일
      </div>
      <input
        ref="emailInput"
        v-model="email"
        type="email"
        name="email"
        placeholder="이메일 주소를 입력하세요"
        class="mt-3 inline-flex h-[56px] w-[432px] items-center justify-start gap-2 rounded-xl border border-gray-200 bg-white px-4"
        :class="{
          'border-gray-300 focus:outline-remak-blue': emailAvailable,
          'border-red-500 focus:outline-red-500': !emailAvailable,
        }"
        @input="checkEmail"
        @keyup.enter="handleNextClick"
      />
      <div class="h-4">
        <span v-if="!emailAvailable" class="text-xs text-red-500"
          >이미 사용중인 이메일입니다.</span
        >
      </div>
      <button
        :class="emailClass"
        :disabled="!isValidEmail(email)"
        class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl px-2 py-4"
        @click="handleNextClick"
      >
        다음으로
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRegisterStore } from '~/stores/register';

const registerStore = useRegisterStore();
const email = ref('');
const emailAvailable = ref(true);
const emailInput = ref<HTMLInputElement | null>(null);

onActivated(() => {
  emailInput.value?.focus();
});

const handleNextClick = async () => {
  if (await registerStore.getSignUpCode(email.value)) {
    emailAvailable.value = true;
    registerStore.registerEmail = email.value;
  } else {
    emailAvailable.value = false;
  }
};

const emailClass = computed(() => {
  return isValidEmail(email.value)
    ? 'bg-remak-blue text-white'
    : 'bg-gray-200 text-gray-500';
});

const checkEmail = () => {
  isValidEmail(email.value);
};

const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
};
</script>
