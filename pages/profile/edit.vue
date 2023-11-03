<template>
  <div>
    <TopBar />

    <div class="flex h-screen flex-col">
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="4" class="mt-20"> </SideNavigation>
        <div class="mt-20 w-full bg-[#F4F6F8] ml-48 flex-col">
          <div class="flex relative flex-col mt-20 mx-20">
            <div>
              <button
                class="flex flex-row justify-start items-center h-8 pl-2 pr-4 rounded-lg hover:bg-[#e9ecef]"
                @click="$router.back()"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="#1F8CE6"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <p class="text-sm font-medium text-center ml-2 text-[#1f8ce6]">
                  이전으로 돌아가기
                </p>
              </button>
            </div>
            <p class="text-[32px] font-bold mt-6">프로필 편집</p>
            <div
              class="flex w-full rounded-2xl bg-white border border-[#e6e8eb] mt-9 flex-col"
            >
              <div
                class="flex justify-between items-center py-4 mt-9 mx-6 border-b border-l-0 border-[#e6e8eb]"
              >
                <div class="flex flex-col justify-start items-start gap-1">
                  <p class="text-sm text-center text-[#646f7c]">이메일</p>
                  <p class="text-base font-medium text-center">
                    {{ userEmail }}
                  </p>
                </div>
              </div>
              <div
                class="flex justify-between items-center py-4 mx-6 border-b border-l-0 border-[#e6e8eb] mb-9"
              >
                <div class="flex flex-col justify-start items-start gap-1">
                  <p class="text-sm text-center text-[#646f7c]">비밀번호</p>
                  <p class="text-base font-medium text-center">**********</p>
                </div>
                <button
                  class="flex justify-center items-center px-3 py-2 rounded-md bg-[#fefefe] border border-[#e6e8eb] text-center"
                  @click="hanleEditBtnClick"
                >
                  변경하기
                </button>
              </div>
            </div>
            <NuxtLink
              class="flex mt-6 justify-end items-end text-xs font-medium text-[#646f7c] underline underline-offset-1"
              to="/profile/withdraw"
            >
              탈퇴하기
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/account';

const accountStore = useAccountStore();

onMounted(() => {
  accountStore.fetchUserInfo();
});

const userEmail = computed(() => {
  return accountStore.userInfo.email;
});

const hanleEditBtnClick = () => {
  accountStore.resetCode(userEmail.value);
  navigateTo('/profile/change-password');
};
</script>
