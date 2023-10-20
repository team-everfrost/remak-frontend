<template>
  <ModalAddModal :is-open="isModalOpen" @update:is-open="handleIsOpenUpdate" />
  <div
    class="fixed left-0 top-0 flex h-20 w-full items-center border-b border-gray-300 bg-topbar-background px-6"
  >
    <NuxtLink to="/">
      <img src="~/assets/logo.svg" alt="logo" />
    </NuxtLink>
    <div class="flex flex-grow"></div>
    <button
      class="relative flex h-9 flex-shrink-0 w-20 items-center justify-center rounded-md bg-[#1f8ce6]"
      @click="openModal"
    >
      <p
        class="flex-shrink-0 flex-grow-0 text-center text-base font-medium text-white"
      >
        추가하기
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const handleIsOpenUpdate = (value: boolean) => {
  isModalOpen.value = value;
};
</script>
