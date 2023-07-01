<script setup>
useSeoMeta({
  title: '로그인 - Remak',
});
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center">
        <NuxtLink to="/">Remak</NuxtLink>
      </div>
      <div>
        <h2 class="mt-6 text-center text-5xl font-bold text-gray-900">
          로그인
        </h2>
      </div>
      <form class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="text-sm text-gray-600"
              >이메일</label
            >
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
              placeholder="이메일 주소를 입력하세요"
            />
          </div>
          <div class="pt-4">
            <label for="password" class="text-sm text-gray-600">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            로그인
          </button>
        </div>
      </form>
      <div>
        <p class="text-center text-sm text-gray-500">회원가입</p>
      </div>
    </div>
  </div>
</template>
