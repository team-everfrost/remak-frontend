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
      :src="imageType"
      class="absolute bottom-4 right-4 h-[125px] w-[125px]"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  type: string;
}>();

const imageType = computed(() => {
  if (props.type === 'file') {
    return '/assets/icons/icon_add_file.svg';
  } else if (props.type === 'photo') {
    return '/assets/icons/icon_add_photo.svg';
  } else if (props.type === 'memo') {
    return '/assets/icons/icon_add_memo.svg';
  } else if (props.type === 'link') {
    return '/assets/icons/icon_add_link.svg';
  }
});
</script>
