<template>
  <div>
    <TopBar />
    <div class="flex h-screen flex-col">
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="4" class="mt-20"> </SideNavigation>
        <div class="mt-20 w-full bg-[#F4F6F8] ml-48 flex-col">
          <div class="flex relative flex-col mt-20 mx-[232px]">
            <div>
              <button
                class="flex flex-row justify-center items-center"
                @click="navigateTo('/account/edit')"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
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
            <p class="text-[32px] font-bold mt-6">비밀번호 변경</p>
            <component :is="currentComponent" class="mt-9" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/account';

const accountStore = useAccountStore();

const ChangePwVerifyCode = defineAsyncComponent(
  () => import('@/components/ChangePw/VerifyCode.vue'),
);
const ChangePwPassword = defineAsyncComponent(
  () => import('@/components/ChangePw/Password.vue'),
);
const ChangePwPasswordRepeat = defineAsyncComponent(
  () => import('@/components/ChangePw/PasswordRepeat.vue'),
);

const currentComponent = computed(() => {
  switch (accountStore.resetPage) {
    case 1:
      return ChangePwVerifyCode;
    case 2:
      return ChangePwPassword;
    case 3:
      return ChangePwPasswordRepeat;

    default:
      return ChangePwVerifyCode;
  }
});
</script>
