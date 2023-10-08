<script setup>
useSeoMeta({
  title: '로그인 - Remak',
});
</script>

<template>
  <div>
    <TopBar />
    <div class="flex min-h-screen items-center justify-center bg-white">
      <div class="text-center">
        <div class="mb-4 text-2xl font-bold">
          <span class="text-sky-500">쉽다, 빠르다, 편리하다</span>
          <span class="text-gray-800">REMAK</span>
        </div>
        <input
          v-model="email"
          type="email"
          placeholder="이메일 주소를 입력하세요"
          class="mb-4 mt-[48px] block h-[56px] w-[440px] rounded-xl border border-gray-300 bg-white px-4 py-2"
          @input="checkEmail"
        />
        <input
          v-if="showPasswordInput"
          type="password"
          placeholder="비밀번호를 입력하세요"
          class="mb-4 mt-4 block h-[56px] w-[440px] rounded-lg border border-gray-300 px-4 py-2"
        />
        <button
          class="mb-4 mt-[48px] block h-[56px] w-[440px] rounded-lg border bg-zinc-100 px-4 py-2 text-neutral-300"
          :class="emailClass"
          :disabled="!isValidEmail(email)"
          @click="handleNextClick"
        >
          다음으로
        </button>
        <NuxtLink to="/registerEmail" class="text-xs text-gray-700 underline">
          처음 이용하시나요?
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      showPasswordInput: false,
    };
  },
  computed: {
    emailClass() {
      if (this.isValidEmail(this.email)) {
        return 'bg-remak-blue text-white';
      }
      return 'bg-gray-300 text-gray-500';
    },
  },
  methods: {
    checkEmail() {
      this.isValidEmail(this.email);
    },
    isValidEmail(email) {
      const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return regex.test(email);
    },
    handleNextClick() {
      this.showPasswordInput = true;
    },
  },
};
</script>
