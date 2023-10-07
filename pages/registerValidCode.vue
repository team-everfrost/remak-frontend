<script setup>
useSeoMeta({
    title: '회원가입 - Remak',
});
</script>

<template>
    <TopBar />
    <div class="flex min-h-screen flex-col items-center bg-remak-background-gray pt-36">
        <div class="mb-4 text-2xl font-bold">
            <span class="text-gray-800">회원가입</span>
        </div>
        <div class="w-[480px] h-[358px] px-6 py-9 bg-white rounded-2xl border border-gray-200 flex flex-col">
            <div class="text-center">
                <span class="text-xl font-bold leading-relaxed text-blue-500">{Mail}</span>
                <span class="text-neutral-900 text-xl font-medium leading-relaxed">
                    로 발송 된<br />인증번호를 입력해주세요
                </span>
            </div>
            <div class="flex space-x-2 mt-8 justify-center"> <!-- 이 div에서 각 입력 상자를 일렬로 배열합니다 -->
                <input v-for="(input, index) in inputs" :key="index" :value="input" type="text" inputmode="numeric"
                    pattern="[0-9]*" maxlength="1" @input="updateInput(index, $event)" @keypress="restricInput"
                    class=" outline-none focus:border-remak-blue focus:border-2 w-12 h-[54px] text-center bg-neutral-100 rounded-lg border border-gray-200" />
            </div>
            <button :disabled="!allFieldsFilled" :class="{
                'bg-remak-blue text-white': allFieldsFilled,
                'bg-gray-200 text-gray-500': !allFieldsFilled,
            }" class="mt-12 w-[432px] h-[52px] px-2 py-4 rounded-xl justify-center items-center inline-flex">
                다음으로
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputs: Array(6).fill(''),
        }
    },
    computed: {
        allFieldsFilled() {
            return this.inputs.every((input) => input && input.length > 0);
        }
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
        }
    }
}
</script>
