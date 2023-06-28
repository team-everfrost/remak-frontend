<script setup>
useSeoMeta({
  title: '로그인 - Remak',
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-sm w-full space-y-8">
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
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="text-gray-600 text-sm"
              >이메일</label
            >
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10"
              placeholder="이메일 주소를 입력하세요"
            />
          </div>
          <div class="pt-4">
            <label for="password" class="text-gray-600 text-sm">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
