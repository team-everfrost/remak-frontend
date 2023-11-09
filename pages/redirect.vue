<template>
  <div class="flex h-screen w-screen">
    <div class="flex w-full flex-col items-center my-auto">
      <p class="text-sm font-bold">{{ url }}</p>
      <p class="text-base font-normal">
        해당 페이지로 이동 중입니다. 잠시만 기다려주세요.
      </p>
      <p class="text-base font-light underline">
        <a :href="url" rel="noopener noreferrer"
          >이동되지 않는다면 여기를 클릭해주세요.</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  publicPage: true,
});

const route = useRoute();
const url = route.query.url as string;

// url로 이동
onActivated(() => (window.location.href = url || '/'));
</script>
