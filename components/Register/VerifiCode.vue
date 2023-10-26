<script setup></script>
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
        <div v-if="isValidCode" class="text-center">
          <span class="text-xl font-bold leading-relaxed text-blue-500">{{
            registerStore.registerEmail
          }}</span>
          <span class="text-xl font-medium leading-relaxed text-neutral-900">
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
            :readonly="index !== currentFocusIndex"
            class="h-[54px] w-12 rounded-lg border border-gray-200 bg-neutral-100 text-center outline-none"
            :class="{
              'focus:border-2': index === currentFocusIndex,
              'border-red-500': !isValidCode,
              'focus:border-remak-blue':
                isValidCode && index === currentFocusIndex,
            }"
            @input="checkNumber($event, index)"
            @paste="handlePaste"
            @keydown="handleKeydown($event, index)"
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
</template>

<script setup lang="ts">
import { useRegisterStore } from '~/stores/register';

const registerStore = useRegisterStore();
const inputFields = ref<HTMLElement[]>([]);
const inputs = ref(Array(6).fill(''));
const isValidCode = ref(true);
const currentFocusIndex = ref(0);

const allFieldsFilled = computed(() => {
  return inputs.value.every((input) => /^[0-9]$/.test(input));
});

const checkNumber = (event: Event, index: number) => {
  const inputEvent = event as InputEvent;
  const value = (inputEvent.target as HTMLInputElement).value;
  if (/^[0-9]*$/.test(value)) {
    inputs.value.splice(index, 1, value);
    if (value && index < inputs.value.length - 1) {
      inputFields.value[index + 1].focus();
      currentFocusIndex.value = index + 1;
    }
    // 입력값이 삭제되었고, 첫 번째 입력창이 아닌 경우
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
  currentFocusIndex.value = lastValidIndex;
};

const checkCode = async () => {
  if (allFieldsFilled.value) {
    if (await registerStore.checkSignUpCode(inputs.value.join(''))) {
      registerStore.registerPage = 3;
    } else {
      isValidCode.value = false;
    }
  }
};

const handleKeydown = (event: KeyboardEvent, index: number) => {
  const inputElement = event.target as HTMLInputElement;
  if (event.key === 'Backspace' && !inputElement.value && index > 0) {
    inputFields.value[index - 1].focus();
    currentFocusIndex.value = index - 1;
  }
};

watchEffect(() => {
  checkCode();
});

onMounted(() => {
  inputFields.value = Array.from(document.querySelectorAll('input'));
});
</script>
