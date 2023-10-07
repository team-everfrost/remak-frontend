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
        <div class="w-[480px] h-[318px] px-6 py-9 bg-white rounded-2xl border border-gray-200 flex flex-col">
            <div class="text-netural-900 text-sm font-medium leading-[14px] text-left items-start">비밀번호 재확인</div>
            <input type="email" placeholder="비밀번호를 입력해주세요"
                class="mt-3 w-[432px] h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-2 inline-flex" />
            <button
                class="mt-12 w-[432px] h-[52px] px-2 py-4 rounded-xl justify-center items-center inline-flex bg-remak-blue text-white">
                다음으로
            </button>
            <button
                class="mt-3 w-[432px] h-[52px] px-2 py-4 rounded-xl justify-center items-center inline-flex bg-neutral-100 text-black font-bold">
                이전으로
            </button>
        </div>
    </div>
</template>

