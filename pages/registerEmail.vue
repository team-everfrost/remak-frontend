<script setup>
useSeoMeta({
  title: '회원가입 - Remak',
});
</script>

<template>
  <TopBar />
  <div class="min-h-screen pt-36 flex flex-col items-center bg-remak-background-gray">
    <div class="mb-4 text-2xl font-bold">
      <span class="text-gray-800">회원가입</span>
    </div>
    <div class="w-[480px] h-[254px] px-6 py-9 bg-white rounded-2xl border border-gray-200 flex flex-col">
      <div class="text-netural-900 text-sm font-medium leading-[14px] text-left items-start">이메일</div>
      <input type="email" placeholder="이메일 주소를 입력하세요" v-model="email" @input="checkEmail"
        class="mt-3 w-[432px] h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-2 inline-flex" />
      <button :class="emailClass" :disabled="!isValidEmail(email)"
        class="mt-12 w-[432px] h-[52px] px-2 py-4 rounded-xl justify-center items-center inline-flex">
        다음으로
      </button>
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

  }
}
</script>