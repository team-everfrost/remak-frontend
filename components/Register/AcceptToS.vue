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
      <div class="text-center">
        <span class="text-xl font-bold leading-relaxed text-neutral-900"
          >약관동의</span
        >
        <p class="text-md font-normal text-neutral-900">
          Remak을 찾아주셔서 정말 감사해요!
        </p>
        <p class="text-md font-normal text-neutral-900">
          서비스를 이용하시기 위해 이용약관에 동의해주세요.
        </p>
      </div>
      <div class="mt-8 flex flex-col">
        <button class="flex gap-2 mb-4" @click="checkAll">
          <img
            v-if="!acceptTerms || !acceptPrivacy"
            class="h-7 w-7"
            src="~/assets/uncheck.svg"
            alt="모두 동의하기"
          />
          <img
            v-else
            class="h-7 w-7"
            src="~/assets/check.svg"
            alt="모두 동의하기"
          />
          <span
            class="text-lg font-normal"
            :class="
              !acceptTerms || !acceptPrivacy
                ? 'text-gray-500'
                : 'text-remak-blue'
            "
            >모두 동의하기</span
          >
        </button>
        <div class="flex gap-2 mb-2">
          <button class="flex gap-2" @click="acceptTerms = !acceptTerms">
            <img
              v-if="!acceptTerms"
              class="h-5 w-5"
              src="~/assets/uncheck.svg"
              alt="이용약관 동의하기"
            />
            <img
              v-else
              class="h-5 w-5"
              src="~/assets/check.svg"
              alt="이용약관 동의하기"
            />
            <span
              class="text-md font-normal"
              :class="!acceptTerms ? 'text-gray-500' : 'text-remak-blue'"
              >이용약관</span
            >
          </button>
          <NuxtLink
            class="ml-auto text-md font-normal text-remak-blue underline"
            to="/terms-of-service"
            target="_blank"
          >
            확인하기
          </NuxtLink>
        </div>
        <div class="flex gap-2 mb-2">
          <button class="flex gap-2" @click="acceptPrivacy = !acceptPrivacy">
            <img
              v-if="!acceptPrivacy"
              class="h-5 w-5"
              src="~/assets/uncheck.svg"
              alt="개인정보처리방침 동의하기"
            />
            <img
              v-else
              class="h-5 w-5"
              src="~/assets/check.svg"
              alt="개인정보처리방침 동의하기"
            />
            <span
              class="text-md font-normal"
              :class="!acceptPrivacy ? 'text-gray-500' : 'text-remak-blue'"
              >개인정보처리방침</span
            >
          </button>
          <NuxtLink
            class="ml-auto text-md font-normal text-remak-blue underline"
            to="/privacy-policy"
            target="_blank"
          >
            확인하기
          </NuxtLink>
        </div>
      </div>
      <button
        :disabled="!acceptTerms || !acceptPrivacy"
        :class="
          !acceptTerms || !acceptPrivacy
            ? 'bg-gray-200 text-gray-500'
            : 'bg-remak-blue text-white'
        "
        class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl px-2 py-4"
        @click="handleNextClick"
      >
        다음으로
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegisterStore } from '~/stores/register';

const registerStore = useRegisterStore();

const acceptTerms = ref(false);
const acceptPrivacy = ref(false);

const checkAll = () => {
  if (acceptTerms.value && acceptPrivacy.value) {
    acceptTerms.value = false;
    acceptPrivacy.value = false;
  } else {
    acceptTerms.value = true;
    acceptPrivacy.value = true;
  }
};

const handleNextClick = () => {
  registerStore.acceptTerms();
};
</script>
