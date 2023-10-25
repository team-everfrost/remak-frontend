<template>
  <div>
    <DeleteAlert
      :is-open="isDeleteModalOpen"
      :modal-title="'정말로 탈퇴하시겠어요?'"
      :modal-subtitle="'회원탈퇴를 하시면 데이터가 모두 삭제돼요\n 또한, 모든 데이터는 복구가 불가능해요'"
      :cancel-button-text="'취소하기'"
      :confirm-button-text="'탈퇴하기'"
      @update:is-open="handleIsDeleteOpenUpdate"
      @confirm="handleDeleteConfirmClick"
    />

    <ModalInformAlert
      :is-open="isInformModalOpen"
      :modal-title="'회원탈퇴가 완료되었어요'"
      :modal-subtitle="'그동안 이용해주셔서 감사했어요'"
      :confirm-button-text="'확인'"
      @update:is-open="handleIsInformOpenUpdate"
      @confirm="handleInformConfirmClick"
    />

    <TopBar />
    <div class="flex h-screen flex-col">
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="4" class="mt-20"> </SideNavigation>
        <div class="mt-20 w-full bg-[#F4F6F8] ml-48 flex-col">
          <div class="flex relative flex-col mt-20 mx-20">
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
            <div class="flex justify-center">
              <div
                class="flex h-[358px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
              >
                <div v-if="isValidCode" class="text-center">
                  <span
                    class="text-xl font-bold leading-relaxed text-blue-500"
                    >{{ userEmail }}</span
                  >
                  <span
                    class="text-xl font-medium leading-relaxed text-neutral-900"
                  >
                    로 발송 된<br />인증번호를 입력해주세요
                  </span>
                </div>
                <span
                  v-else
                  class="text-xl font-medium leading-relaxed text-red-500 text-center"
                >
                  인증번호가 일치하지 않습니다<br />
                  다시확인해주세요</span
                >
                <div class="mt-8 flex justify-center space-x-2">
                  <!-- 이 div에서 각 입력 상자를 일렬로 배열합니다 -->
                  <input
                    v-for="(input, index) in inputs"
                    :key="index"
                    ref="inputField"
                    :value="input"
                    type="text"
                    pattern="[0-9]*"
                    maxlength="1"
                    class="h-[54px] w-12 rounded-lg border border-gray-200 bg-neutral-100 text-center outline-none focus:border-2"
                    :class="{
                      'border-red-500': !isValidCode,
                      'focus:border-remak-blue': isValidCode,
                    }"
                    @input="checkNumber($event, index)"
                    @paste="handlePaste"
                  />
                </div>
                <button
                  :disabled="!allFieldsFilled"
                  :class="{
                    'bg-remak-blue text-white': allFieldsFilled,
                    'bg-gray-200 text-gray-500': !allFieldsFilled,
                  }"
                  class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl px-2 py-4"
                  @click="checkCode"
                >
                  다음으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/account';
import { useResetPersistStore } from '~/stores/resetPersist';

const accountStore = useAccountStore();
const resetPersistStore = useResetPersistStore();
const inputFields = ref<HTMLElement[]>([]);

const inputs = ref(Array(6).fill(''));
const isValidCode = ref(true);
const allFieldsFilled = computed(() => {
  return inputs.value.every((input) => /^[0-9]$/.test(input));
});

const isDeleteModalOpen = ref(false);
const handleIsDeleteOpenUpdate = (value: boolean) => {
  isDeleteModalOpen.value = value;
};
const handleDeleteConfirmClick = async () => {
  if (await accountStore.withDraw()) {
    handleIsDeleteOpenUpdate(false);
    handleIsInformOpenUpdate(true);
  }
};

const isInformModalOpen = ref(false);
const handleIsInformOpenUpdate = (value: boolean) => {
  isInformModalOpen.value = value;
};
const handleInformConfirmClick = () => {
  handleIsInformOpenUpdate(false);
  resetPersistStore.resetPersist();
  reloadNuxtApp({ path: '/' });
};

const checkNumber = (event: Event, index: number) => {
  const inputEvent = event as InputEvent;
  const value = (inputEvent.target as HTMLInputElement).value;
  if (/^[0-9]*$/.test(value)) {
    inputs.value.splice(index, 1, value);
    if (value && index < inputs.value.length - 1) {
      inputFields.value[index + 1].focus();
    }
    // 입력값이 삭제되었고, 첫 번째 입력창이 아닌 경우
    else if (!value && index > 0) {
      inputFields.value[index - 1].focus();
    }
  } else {
    (inputEvent.target as HTMLInputElement).value = inputs.value[index];
  }
};

const handlePaste = (event: Event) => {
  event.preventDefault();
  const pasteEvent = event as ClipboardEvent;
  const pasteData = (pasteEvent.clipboardData || window.clipboardData).getData(
    'text',
  );
  const pasteValues = pasteData.split('').slice(0, inputs.value.length);
  let lastValidIndex = -1;
  for (let i = 0; i < pasteValues.length; i++) {
    if (/^[0-9]$/.test(pasteValues[i])) {
      inputs.value[i] = pasteValues[i];
      lastValidIndex = i;
    }
  }
  if (lastValidIndex !== -1) {
    inputFields.value[lastValidIndex].focus(); // 수정된 부분
  }
};

const checkCode = async () => {
  if (allFieldsFilled.value) {
    if (await accountStore.checkWithDrawCode(inputs.value.join(''))) {
      isValidCode.value = true;
      isDeleteModalOpen.value = true;
    } else {
      isValidCode.value = false;
    }
  }
};

const userEmail = computed(() => {
  return accountStore.userInfo.email;
});

watchEffect(() => {
  checkCode();
});

onMounted(() => {
  init();
});

const init = async () => {
  await accountStore.fetchUserInfo();
  await accountStore.getWithDrawCode();
  inputFields.value = Array.from(document.querySelectorAll('input'));
};
</script>
