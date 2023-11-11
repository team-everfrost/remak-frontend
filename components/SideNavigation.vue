<template>
  <div
    class="shrink-0 border-r border-gray-200 bg-white transition-all ease-linear"
    :class="isFolded ? 'w-16' : 'w-48'"
  >
    <div class="sticky top-20 h-[calc(100vh-80px)] flex flex-col">
      <button
        :class="buttonClass('main')"
        class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm hover:bg-[#e1f1ff] hover:text-[#1F8CE6]"
        @click="navigateTo('/main')"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 33 32"
          fill="none"
          class="flex-grow-0 flex-shrink-0 w-7 h-7"
          :class="svgClass('main')"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0666 6.67496C16.5333 6.27496 15.8 6.27496 15.2666 6.67496L7.76663 12.3C7.38892 12.5832 7.16663 13.0278 7.16663 13.5V24.75C7.16663 25.5784 7.8382 26.25 8.66663 26.25H11.2916C12.1201 26.25 12.7916 25.5784 12.7916 24.75V19.875C12.7916 19.0465 13.4632 18.375 14.2916 18.375H18.0416C18.8701 18.375 19.5416 19.0465 19.5416 19.875V24.75C19.5416 25.5784 20.2132 26.25 21.0416 26.25H23.6666C24.4951 26.25 25.1666 25.5784 25.1666 24.75V13.5C25.1666 13.0278 24.9443 12.5832 24.5666 12.3L17.0666 6.67496Z"
            fill-rule="evenodd"
          />
        </svg>
        <div v-show="!isFolded" class="flex-shrink-0">메인</div>
      </button>
      <button
        :class="buttonClass('search')"
        class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm hover:bg-[#e1f1ff] hover:text-[#1F8CE6]"
        @click="navigateTo('/search')"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-7 h-7"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M21.0002 21L17.6557 17.6555M19.4445 13.2222C19.4445 16.6587 16.6587 19.4444 13.2223 19.4444C9.78581 19.4444 7.00003 16.6587 7.00003 13.2222C7.00003 9.78578 9.78581 7 13.2223 7C16.6587 7 19.4445 9.78578 19.4445 13.2222Z"
            :stroke="svgStroke('search')"
            stroke-width="1.55556"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <div v-show="!isFolded" class="flex-shrink-0">검색</div>
      </button>

      <button
        :class="buttonClass('chat')"
        class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm hover:bg-[#e1f1ff] hover:text-[#1F8CE6]"
        @click="navigateTo('/chat')"
      >
        <div
          class="flex-grow-0 flex-shrink-0 w-7 h-7 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 28 28"
            class="flex-grow-0 flex-shrink-0 w-5 h-5"
            :class="svgClass('chat')"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.394 4.81548C25.9995 5.89416 26.0945 6.91511 26.6015 7.93782C27.5393 9.82871 27.984 11.8415 27.9997 13.951C28.0073 15.1422 27.8639 16.3159 27.5684 17.4681C25.6941 24.7716 18.3652 29.2939 11.0019 27.67C7.55332 26.9097 4.76571 25.0835 2.69204 22.2288C0.381756 19.0482 -0.431857 15.4751 0.213904 11.6088C0.786813 8.17863 2.47815 5.35366 5.17018 3.15899C8.16528 0.717099 11.6161 -0.290441 15.4575 0.0716444C17.0935 0.225573 18.6554 0.682699 20.1259 1.42028C21.1196 1.9188 22.1203 1.98352 23.1658 1.60803C23.9864 1.31299 24.8193 1.05295 25.6451 0.773075C26.1458 0.603401 26.6079 0.6413 26.9891 1.03546C27.3615 1.42028 27.3848 1.87507 27.2187 2.3631C26.9407 3.17998 26.6907 4.00619 26.394 4.81607L26.394 4.81548Z"
              fill="evenodd"
            />
            <path
              d="M9.86511 11.316C10.7342 11.316 11.4387 12.5299 11.4387 14.0273C11.4387 15.5246 10.7342 16.7385 9.86511 16.7385C8.99603 16.7385 8.2915 15.5246 8.2915 14.0273C8.2915 12.5299 8.99603 11.316 9.86511 11.316Z"
              fill="evenodd"
            />
            <path
              d="M18.2001 11.316C19.0691 11.316 19.7737 12.5299 19.7737 14.0273C19.7737 15.5246 19.0691 16.7385 18.2001 16.7385C17.331 16.7385 16.6265 15.5246 16.6265 14.0273C16.6265 12.5299 17.331 11.316 18.2001 11.316Z"
              fill="evenodd"
            />
          </svg>
        </div>
        <div v-show="!isFolded" class="flex-shrink-0">채팅</div>
      </button>

      <button
        :class="buttonClass('tag')"
        class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm hover:bg-[#e1f1ff] hover:text-[#1F8CE6]"
        @click="navigateTo('/tag')"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-7 h-7"
          preserveAspectRatio="xMidYMid meet"
          :class="svgClass('tag')"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.58333 5.25C6.29467 5.25 5.25 6.29467 5.25 7.58333V20.4167C5.25 21.7053 6.29467 22.75 7.58333 22.75H20.4167C21.7053 22.75 22.75 21.7053 22.75 20.4167V7.58333C22.75 6.29467 21.7053 5.25 20.4167 5.25H7.58333ZM10.5062 18.9584H11.6595C11.7544 18.9584 11.8359 18.9042 11.863 18.8093L12.3786 16.5605H14.441L13.9389 18.7687C13.9118 18.8906 13.9797 18.9584 14.1018 18.9584H15.2415C15.3365 18.9584 15.4179 18.9042 15.445 18.8093L15.9606 16.5605H17.3717C17.4667 16.5605 17.5346 16.4927 17.5617 16.3979L17.8059 15.287C17.8331 15.1651 17.7652 15.0974 17.6431 15.0974H16.2998L16.8154 12.8485H18.2265C18.3215 12.8485 18.3894 12.7808 18.4165 12.6859L18.6607 11.575C18.6879 11.4531 18.62 11.3854 18.4979 11.3854H17.1546L17.6431 9.23135C17.6702 9.10943 17.6024 9.04169 17.4803 9.04169H16.327C16.232 9.04169 16.1506 9.09588 16.1235 9.19071L15.6214 11.3854H13.559L14.0475 9.23135C14.0746 9.10943 14.0068 9.04169 13.8847 9.04169H12.7314C12.6364 9.04169 12.555 9.09588 12.5278 9.19071L12.0258 11.3854H10.6283C10.5333 11.3854 10.4655 11.4531 10.4383 11.548L10.1941 12.6588C10.1669 12.7808 10.2348 12.8485 10.3569 12.8485H11.7002L11.1846 15.0974H9.77347C9.67849 15.0974 9.61065 15.1651 9.58351 15.2599L9.33928 16.3708C9.31214 16.4927 9.37998 16.5605 9.5021 16.5605H10.8454L10.3433 18.7687C10.3162 18.8906 10.384 18.9584 10.5062 18.9584ZM12.7042 15.0974L13.2198 12.8485H15.2958L14.7802 15.0974H12.7042Z"
          ></path>
        </svg>
        <div v-show="!isFolded" class="flex-shrink-0">태그</div>
      </button>

      <button
        :class="buttonClass('collection')"
        class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm hover:bg-[#e1f1ff] hover:text-[#1F8CE6]"
        @click="navigateTo('/collection')"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-7 h-7"
          preserveAspectRatio="xMidYMid meet"
          :class="svgClass('collection')"
        >
          <path
            d="M6.52603 6.41669C5.50397 6.41669 4.66559 7.26847 4.66666 8.30699L4.68123 19.6932C4.68228 20.7318 5.52571 21.5834 6.54789 21.5834H21.4667C22.4888 21.5834 23.3333 20.7318 23.3333 19.6932V11.1544C23.3333 10.1159 22.4888 9.26597 21.4667 9.26597H14.0146L12.6364 6.66105C12.5962 6.58726 12.5373 6.52568 12.4659 6.48273C12.3944 6.43977 12.313 6.41698 12.2299 6.41669H6.52603Z"
          ></path>
        </svg>
        <div v-show="!isFolded" class="flex-shrink-0">컬렉션</div>
      </button>
      <button
        :class="buttonClass('profile')"
        class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm hover:bg-[#e1f1ff] hover:text-[#1F8CE6]"
        @click="navigateTo('/profile')"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-7 h-7"
          preserveAspectRatio="xMidYMid meet"
          :class="svgClass('profile')"
        >
          <circle cx="14" cy="10.7121" r="4.29545"></circle>
          <path
            d="M14 16.4394C10.193 16.4394 7.01869 18.021 5.31802 19.7124C4.19664 20.8276 5.25939 22.1667 6.84093 22.1667H21.1591C22.7407 22.1667 23.8034 20.8276 22.682 19.7124C20.9814 18.021 17.807 16.4394 14 16.4394Z"
          ></path>
        </svg>
        <div v-show="!isFolded" class="flex-shrink-0">내 정보</div>
      </button>
      <div class="mt-auto">
        <button
          class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-5 text-sm hover:bg-gray-100 text-gray-400 hover:text-[#1F8CE6]/50"
          @click="changeFolded"
        >
          <div v-auto-animate>
            <div v-show="isFolded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="h-5 w-5"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <div v-show="!isFolded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-5 h-5"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '~/stores/ui';

const props = defineProps<{
  activeButton: string;
}>();

const uiStore = useUiStore();

const isFolded = computed(() => uiStore.sidebarFolded);

const changeFolded = () => {
  uiStore.setSidebarFolded(!isFolded.value);
};

const buttonClass = (buttonName: string) => {
  return props.activeButton === buttonName
    ? 'bg-[#CCE8FF] text-[#1F8CE6]'
    : 'text-gray-500';
};

const svgClass = (buttonName: string) => {
  return props.activeButton === buttonName ? 'fill-[#1F8CE6]' : 'fill-gray-500';
};

const svgStroke = (buttonName: string) => {
  return props.activeButton === buttonName ? '#1F8CE6' : '#646F7C';
};
</script>
