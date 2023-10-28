<template>
  <div
    class="relative flex h-[260px] w-[225px] flex-shrink-0 flex-grow-0 flex-col rounded-[33.5px] border-[2.1px] border-[#e6e8eb] bg-[#fefefe]"
  >
    <div
      class="ml-4 mr-5 mt-5 flex h-10 w-[144px] items-center justify-center rounded-[17px] bg-[#cce8ff]"
    >
      <p class="flex text-center text-[23px] font-normal text-[#1f8ce6]">
        {{ title }}
      </p>
    </div>
    <img
      v-if="type === 'file'"
      src="/assets/icons/icon_add_file.svg"
      alt="remak cards"
      class="absolute bottom-4 right-4 h-[125px] w-[125px]"
    />
    <img
      v-else-if="type === 'photo'"
      src="/assets/icons/icon_add_photo.svg"
      alt="remak cards"
      class="absolute bottom-4 right-4 h-[125px] w-[125px]"
    />
    <img
      v-else-if="type === 'memo'"
      src="/assets/icons/icon_add_memo.svg"
      alt="remak cards"
      class="absolute bottom-4 right-4 h-[125px] w-[125px]"
    />
    <img
      v-else-if="type === 'link'"
      src="/assets/icons/icon_add_link.svg"
      alt="remak cards"
      class="absolute bottom-4 right-4 h-[125px] w-[125px]"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  type: string;
}>();
</script>
