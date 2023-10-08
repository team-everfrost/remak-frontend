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
        class="flex h-[318px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
      >
        <div
          class="text-netural-900 items-start text-left text-sm font-medium leading-[14px]"
        >
          비밀번호 재확인
        </div>
        <input
          type="email"
          placeholder="비밀번호를 입력해주세요"
          class="mt-3 inline-flex h-14 w-[432px] items-center justify-start gap-2 rounded-xl border border-gray-200 bg-white px-4"
        />
        <button
          class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl bg-remak-blue px-2 py-4 text-white"
        >
          다음으로
        </button>
        <button
          class="mt-3 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl bg-neutral-100 px-2 py-4 font-bold text-black"
        >
          이전으로
        </button>
      </div>
    </div>
  </div>
</template>
