<template>
  <div
    class="fixed left-0 flex h-screen w-48 flex-col border-r border-gray-200 bg-white"
  >
    <button
      :class="buttonClass(1)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
    >
      <img src="~/assets/icons/icon_search.svg" alt="검색" />
      검색
    </button>
    <button
      :class="buttonClass(2)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
    >
      <img src="~/assets/icons/icon_tag.svg" alt="태그" />
      태그
    </button>

    <button
      :class="buttonClass(3)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
      @click="handleCollectionClick"
    >
      <img src="~/assets/icons/icon_collection.svg" alt="컬렉션" />
      컬렉션
    </button>
    <button
      :class="buttonClass(4)"
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm"
      @click="handleAccountClick"
    >
      <img src="~/assets/icons/icon_profile.svg" alt="내 정보" />
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

const buttonClass = (buttonNumber: number) => {
  return props.activeButton === buttonNumber
    ? ' bg-[#CCE8FF] text-[#1F8CE6]   '
    : 'text-gray-500';
};
</script>
