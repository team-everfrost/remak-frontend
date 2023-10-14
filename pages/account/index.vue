<template>
  <div>
    <div class="flex h-screen flex-col">
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="4" class="mt-20"> </SideNavigation>
        <div class="mt-20 w-full bg-[#F4F6F8] ml-48 flex-col">
          <div class="flex relative mx-20 mt-20 items-center flex-col">
            <div class="flex relative w-full items-center flex-col md:flex-row">
              <p class="text-[32px] font-bold">내 정보</p>
              <button
                class="justify-center h-8 items-center px-3 rounded-md ml-4 bg-[#475161] text-white"
                @click="navigateTo('/account/edit')"
              >
                프로필 편집
              </button>
              <div class="flex-grow"></div>
              <button
                class="justify-center h-8 items-center px-3 rounded-md border border-[#e6e8eb] ml-4 bg-[#fefefe] font-medium"
                @click="open"
              >
                로그아웃
              </button>
              <ModalsContainer />
            </div>
            <div
              class="mt-10 flex flex-col w-full h-[128px] bg-white rounded-[20px] gap-4 p-5"
            >
              <p class="text-xl font-bold text-start">무료플랜</p>
              <div
                class="bar-container bg-[#EEEEEE] rounded-lg overflow-hidden"
              >
                <div
                  :style="{ width: progress + '%' }"
                  class="bar-progress bg-[#1F8CE6] h-1"
                ></div>
              </div>
              <div class="flex flex-row justify-start">
                <p class="text-sm font-bold text-start text-[#1F8CE6]">
                  {{ usedUsage }}
                </p>
                <p class="text-sm font-bold text-start ml-1 text-[#464749]">
                  /
                </p>
                <p class="text-sm font-bold text-start ml-1 text-[#464749]">
                  {{ totalUsage }}GB
                </p>
                <p class="text-sm font-bold text-start ml-1 text-[#757779]">
                  ({{ usedPercentage }}% 사용 중)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal';
import DeleteAlert from '~/components/DeleteAlert.vue';
import { useAccountStore } from '~/stores/account';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const accountStore = useAccountStore();

const progress = ref(0);
const usedUsage = ref(0);
const totalUsage = ref(1);
const usedPercentage = computed(() => {
  const percentage = (usedUsage.value / totalUsage.value) * 100;
  const roundedPercentage = Math.round(percentage * 10) / 10; // 소수점 첫째 자리까지 반올림
  updateProgress(roundedPercentage);
  return roundedPercentage;
});

const updateProgress = (newProgress: number) => {
  progress.value = newProgress;
};

const initFetch = async () => {
  const usage = await accountStore.getUsageSize();
  const total = await accountStore.getStorageSize();

  // usage값을 bytes에서 gb로 변환 단위는 소수점 1자리에서 반올림
  const usageInGB = Math.round((usage / 1024 / 1024 / 1024) * 100) / 100;
  usedUsage.value = usageInGB;
  const totalInGB = total / 1024 / 1024 / 1024;
  totalUsage.value = totalInGB;
};

const { open, close } = useModal({
  component: DeleteAlert,
  attrs: {
    modalTitle: '로그아웃',
    modalSubtitle: '정말 로그아웃 하시겠습니까?',
    cancelButtonText: '취소',
    confirmButtonText: '확인',
    onConfirm() {
      close();
      authStore.signOut();
      navigateTo('/');
    },
    onCancel() {
      close();
    },
  },
});

onMounted(() => {
  initFetch();
});
</script>
