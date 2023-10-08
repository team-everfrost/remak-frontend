<script setup>
useSeoMeta({
  title: '회원가입 - Remak',
});
</script>

<template>
  <div>
    <TopBar />
    <div
      class="flex min-h-screen flex-col items-center bg-remak-background-gray pt-36"
    >
      <div class="mb-4 text-2xl font-bold">
        <span class="text-gray-800">회원가입</span>
      </div>
      <div
        class="flex h-[254px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
      >
        <div
          class="text-netural-900 items-start text-left text-sm font-medium leading-[14px]"
        >
          이메일
        </div>
        <input
          v-model="email"
          type="email"
          placeholder="이메일 주소를 입력하세요"
          class="mt-3 inline-flex h-14 w-[432px] items-center justify-start gap-2 rounded-xl border border-gray-200 bg-white px-4"
          @input="checkEmail"
        />
        <button
          :class="emailClass"
          :disabled="!isValidEmail(email)"
          class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl px-2 py-4"
        >
          다음으로
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  computed: {
    emailClass() {
      if (this.isValidEmail(this.email)) {
        return 'bg-remak-blue text-white';
      }
      return 'bg-gray-200 text-gray-500';
    },
  },
  methods: {
    checkEmail() {
      this.isValidEmail(this.email);
    },
    isValidEmail(email) {
      console.log('checkEmail');
      const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return regex.test(email);
    },
  },
};
</script>
