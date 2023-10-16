<template>
  <div
    class="fixed left-0 flex h-screen w-48 flex-col border-r border-gray-200 bg-white"
  >
    <button
      :class="buttonClass(1)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
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
          :stroke="svgStroke(1)"
          stroke-width="1.55556"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>

      검색
    </button>
    <button
      :class="buttonClass(2)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
      @click="handleTagClick"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0 w-7 h-7"
        preserveAspectRatio="xMidYMid meet"
        :class="svgClass(2)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.58333 5.25C6.29467 5.25 5.25 6.29467 5.25 7.58333V20.4167C5.25 21.7053 6.29467 22.75 7.58333 22.75H20.4167C21.7053 22.75 22.75 21.7053 22.75 20.4167V7.58333C22.75 6.29467 21.7053 5.25 20.4167 5.25H7.58333ZM10.5062 18.9584H11.6595C11.7544 18.9584 11.8359 18.9042 11.863 18.8093L12.3786 16.5605H14.441L13.9389 18.7687C13.9118 18.8906 13.9797 18.9584 14.1018 18.9584H15.2415C15.3365 18.9584 15.4179 18.9042 15.445 18.8093L15.9606 16.5605H17.3717C17.4667 16.5605 17.5346 16.4927 17.5617 16.3979L17.8059 15.287C17.8331 15.1651 17.7652 15.0974 17.6431 15.0974H16.2998L16.8154 12.8485H18.2265C18.3215 12.8485 18.3894 12.7808 18.4165 12.6859L18.6607 11.575C18.6879 11.4531 18.62 11.3854 18.4979 11.3854H17.1546L17.6431 9.23135C17.6702 9.10943 17.6024 9.04169 17.4803 9.04169H16.327C16.232 9.04169 16.1506 9.09588 16.1235 9.19071L15.6214 11.3854H13.559L14.0475 9.23135C14.0746 9.10943 14.0068 9.04169 13.8847 9.04169H12.7314C12.6364 9.04169 12.555 9.09588 12.5278 9.19071L12.0258 11.3854H10.6283C10.5333 11.3854 10.4655 11.4531 10.4383 11.548L10.1941 12.6588C10.1669 12.7808 10.2348 12.8485 10.3569 12.8485H11.7002L11.1846 15.0974H9.77347C9.67849 15.0974 9.61065 15.1651 9.58351 15.2599L9.33928 16.3708C9.31214 16.4927 9.37998 16.5605 9.5021 16.5605H10.8454L10.3433 18.7687C10.3162 18.8906 10.384 18.9584 10.5062 18.9584ZM12.7042 15.0974L13.2198 12.8485H15.2958L14.7802 15.0974H12.7042Z"
        ></path>
      </svg>
      태그
    </button>

    <button
      :class="buttonClass(3)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
      @click="handleCollectionClick"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0 w-7 h-7"
        preserveAspectRatio="xMidYMid meet"
        :class="svgClass(3)"
      >
        <path
          d="M6.52603 6.41669C5.50397 6.41669 4.66559 7.26847 4.66666 8.30699L4.68123 19.6932C4.68228 20.7318 5.52571 21.5834 6.54789 21.5834H21.4667C22.4888 21.5834 23.3333 20.7318 23.3333 19.6932V11.1544C23.3333 10.1159 22.4888 9.26597 21.4667 9.26597H14.0146L12.6364 6.66105C12.5962 6.58726 12.5373 6.52568 12.4659 6.48273C12.3944 6.43977 12.313 6.41698 12.2299 6.41669H6.52603Z"
        ></path>
      </svg>
      컬렉션
    </button>
    <button
      :class="buttonClass(4)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
      @click="handleAccountClick"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0 w-7 h-7"
        preserveAspectRatio="xMidYMid meet"
        :class="svgClass(4)"
      >
        <circle cx="14" cy="10.7121" r="4.29545"></circle>
        <path
          d="M14 16.4394C10.193 16.4394 7.01869 18.021 5.31802 19.7124C4.19664 20.8276 5.25939 22.1667 6.84093 22.1667H21.1591C22.7407 22.1667 23.8034 20.8276 22.682 19.7124C20.9814 18.021 17.807 16.4394 14 16.4394Z"
        ></path>
      </svg>

      내 정보
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  activeButton: number;
}>();

const handleAccountClick = () => {
  navigateTo('/account');
};

const handleCollectionClick = () => {
  navigateTo('/collection');
};

const handleTagClick = () => {
  navigateTo('/tag');
};

const buttonClass = (buttonNumber: number) => {
  return props.activeButton === buttonNumber
    ? ' bg-[#CCE8FF] text-[#1F8CE6]   '
    : 'text-gray-500';
};

const svgClass = (buttonNumber: number) => {
  return props.activeButton === buttonNumber
    ? 'fill-[#1F8CE6]'
    : 'fill-gray-500';
};

const svgStroke = (buttonNumber: number) => {
  return props.activeButton === buttonNumber ? '#1F8CE6' : '#646F7C';
};
</script>
