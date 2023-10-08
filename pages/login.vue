<script setup>
useSeoMeta({
  title: '로그인 - Remak',
});
</script>

<template>
  <TopBar />
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="text-center">
      <div class="mb-4 text-2xl font-bold">
        <span class="text-sky-500">쉽다, 빠르다, 편리하다</span> <span class="text-gray-800">REMAK</span>
      </div>
      <input type="email" placeholder="이메일 주소를 입력하세요" v-model="email" @input="checkEmail"
        class="block w-[440px] h-[56px] mt-[48px] px-4 py-2 mb-4 border border-gray-300 rounded-xl bg-white" />
      <input v-if="showPasswordInput" type="password" placeholder="비밀번호를 입력하세요"
        class="block w-[440px] h-[56px] mt-4 px-4 py-2 mb-4 border border-gray-300 rounded-lg" />
      <button class="block w-[440px] h-[56px] mt-[48px] px-4 py-2 mb-4 border rounded-lg bg-zinc-100 text-neutral-300"
        :class="emailClass" :disabled="!isValidEmail(email)" @click="handleNextClick">
        다음으로
      </button>
      <NuxtLink to="/registerEmail" class="text-gray-700 underline text-xs">
        처음 이용하시나요?
      </NuxtLink>
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
    }
  }
}
</script>
