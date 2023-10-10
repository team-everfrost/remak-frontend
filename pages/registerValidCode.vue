<script setup>
useSeoMeta({
  title: '회원가입 - Remak',
});
</script>

<template>
  <div>
    <TopBarBase />
    <div
      class="flex min-h-screen flex-col items-center bg-remak-background-gray pt-36"
    >
      <div class="mb-4 text-2xl font-bold">
        <span class="text-gray-800">회원가입</span>
      </div>
      <div
        class="flex h-[358px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
      >
        <div class="text-center">
          <span class="text-xl font-bold leading-relaxed text-blue-500"
            >{Mail}</span
          >
          <span class="text-xl font-medium leading-relaxed text-neutral-900">
            로 발송 된<br />인증번호를 입력해주세요
          </span>
        </div>
        <div class="mt-8 flex justify-center space-x-2">
          <!-- 이 div에서 각 입력 상자를 일렬로 배열합니다 -->
          <input
            v-for="(input, index) in inputs"
            :key="index"
            :value="input"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="1"
            class="h-[54px] w-12 rounded-lg border border-gray-200 bg-neutral-100 text-center outline-none focus:border-2 focus:border-remak-blue"
            @input="updateInput(index, $event)"
            @keypress="restricInput"
          />
        </div>
        <button
          :disabled="!allFieldsFilled"
          :class="{
            'bg-remak-blue text-white': allFieldsFilled,
            'bg-gray-200 text-gray-500': !allFieldsFilled,
          }"
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
      inputs: Array(6).fill(''),
    };
  },
  computed: {
    allFieldsFilled() {
      return this.inputs.every((input) => input && input.length > 0);
    },
  },
  methods: {
    updateInput(index, event) {
      this.inputs.splice(index, 1, event.target.value);
    },
    restricInput(event) {
      const regex = /[0-9]/g;
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    },
  },
};
</script>
