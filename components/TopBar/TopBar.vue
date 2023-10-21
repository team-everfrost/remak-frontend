<template>
  <div
    class="left-0 top-0 flex h-20 w-full items-center border-b border-gray-300 bg-topbar-background pl-6"
    :class="isFixed ? 'fixed' : 'absolute'"
  >
    <button @click="handleClick">
      <img src="~/assets/logo.svg" alt="logo" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isFixed: {
    type: Boolean,
    default: true,
  },
});

const handleClick = () => {
  navigateTo('/');
};
</script>
