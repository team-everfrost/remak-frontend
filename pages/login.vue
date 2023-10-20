<template>
  <div>
    <TopBarBase />
    <div class="flex min-h-screen items-center justify-center bg-white">
      <div v-auto-animate class="text-center">
        <div class="mb-4 text-2xl font-bold">
          <span class="text-sky-500">쉽다, 빠르다, 편리하다 </span>
          <span class="text-gray-800">Remak</span>
        </div>
        <input
          v-model="email"
          type="email"
          placeholder="이메일 주소를 입력하세요"
          class="mt-[48px] block h-[56px] w-[440px] rounded-xl border bg-white px-4 py-2"
          :class="{
            'border-gray-300 focus:outline-remak-blue': !emailNotExists,
            'border-red-500 focus:outline-red-500': emailNotExists,
          }"
          autofocus
          @input="checkEmail"
          @keyup.enter="handleNextClick"
        />
        <div class="h-4">
          <span v-if="emailNotExists" class="text-xs text-red-500"
            >존재하지 않는 이메일입니다.</span
          >
        </div>
        <input
          v-if="showPasswordInput"
          ref="passwordInput"
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          class="mb-4 mt-4 block h-[56px] w-[440px] rounded-lg border px-4 py-2"
          :class="{
            'border-gray-300 focus:outline-remak-blue': !passwordWrong,
            'border-red-500 focus:outline-red-500': passwordWrong,
          }"
          @input="() => (passwordWrong = false)"
          @keyup.enter="handleNextClick"
        />
        <div class="h-4">
          <span v-if="passwordWrong" class="text-xs text-red-500"
            >잘못된 비밀번호입니다.</span
          >
        </div>
        <button
          class="mb-4 mt-[32px] block h-[56px] w-[440px] rounded-lg border px-4 py-2"
          :class="{
            'bg-remak-blue text-white': isValidEmail(email),
            'bg-gray-300 text-gray-500': !isValidEmail(email),
          }"
          :disabled="!isValidEmail(email)"
          @click="handleNextClick"
        >
          다음으로
        </button>
        <NuxtLink to="/register" class="text-xs text-gray-700 underline">
          처음 이용하시나요?
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  onlyLogout: true,
});

const email = ref('');
const password = ref('');
const showPasswordInput = ref(false);
const emailNotExists = ref(false);
const passwordWrong = ref(false);

const passwordInput = ref<HTMLInputElement | null>(null);

const authStore = useAuthStore();

const checkEmail = () => {
  isValidEmail(email.value);
  showPasswordInput.value = false;
  emailNotExists.value = false;
};

const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
};

const handleNextClick = async () => {
  if (!isValidEmail(email.value)) {
    return;
  }

  if (showPasswordInput.value) {
    if (await authStore.signIn(email.value, password.value)) {
      navigateTo('/');
    } else {
      passwordWrong.value = true;
      nextTick(() => {
        passwordInput.value?.focus();
      });
    }
    return;
  }

  if (await authStore.checkEmail(email.value)) {
    showPasswordInput.value = true;
    emailNotExists.value = false;
    nextTick(() => {
      passwordInput.value?.focus();
    });
  } else {
    emailNotExists.value = true;
  }
};
</script>
