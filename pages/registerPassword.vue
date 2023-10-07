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
        <div class="w-[480px] h-[282px] px-6 py-9 bg-white rounded-2xl border border-gray-200 flex flex-col">
            <div class="text-netural-900 text-sm font-medium leading-[14px] text-left items-start">비밀번호</div>
            <input type="password" placeholder="비밀번호를 입력해주세요" v-model="password" @input="checkPassword"
                class="mt-3 w-[432px] h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-2 inline-flex" />

            <div class="flex mt-4">
                <div class="flex items-center">
                    <img :src="letterCheckImg" alt="" />
                    <span class="text-gray-500 text-sm leading-[14px] ml-1">영문자</span>
                </div>
                <div class="flex items-center">
                    <img :src="numberCheckImg" alt="" class="ml-2" />
                    <span class="text-gray-500 text-sm leading-[14px] ml-1">숫자</span>
                </div>
                <div class="flex items-center">
                    <img :src="lengthCheckImg" alt="" class="ml-2" />
                    <span class="text-gray-500 text-sm leading-[14px] ml-1">9자 이상</span>
                </div>


            </div>
            <button :class="passwordClass" :disabled="!isValidPassword(password)"
                class="mt-12 w-[432px] h-[52px] px-2 py-4 rounded-xl justify-center items-center inline-flex">
                다음으로
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
        };
    },
    computed: {
        passwordClass() {
            if (this.isValidPassword(this.password)) {
                return 'bg-remak-blue text-white';
            }
            return 'bg-gray-200 text-gray-500';
        },
        lengthCheckImg() {
            return this.password.length >= 9 ? '/assets/check.svg' : '/assets/uncheck.svg';
        },
        numberCheckImg() {
            return /\d/.test(this.password) ? 'assets/check.svg' : 'assets/uncheck.svg';
        },
        letterCheckImg() {
            return /[A-Za-z]/.test(this.password) ? 'assets/check.svg' : 'assets/uncheck.svg';
        },
    },
    methods: {
        checkPassword() {
            this.isValidPassword(this.email);
        },
        isValidPassword(password) {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
            return regex.test(password);
        },

    }
}
</script>