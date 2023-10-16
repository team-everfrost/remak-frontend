<template>
  <button>
    <div
      class="flex min-h-[124px] min-w-[140px] max-w-[258px]overflow-hidden rounded-2xl border border-[#e6e8eb] bg-white"
      style="
        box-shadow:
          0px 0px 1px 0 rgba(65, 74, 82, 0.04),
          0px 2px 4px 0 rgba(102, 110, 119, 0.16);
      "
    >
      <div class="flex w-full flex-col">
        <p class="flex ml-4 mt-5 text-base font-medium line-clamp-1">
          {{ name }}
        </p>
        <div class="flex-grow"></div>
        <p
          class="flex justify-end items-end text-xl font-bold mr-3 mb-2 text-[#1f8ce6]"
        >
          {{ count }}개
        </p>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  count: number | null;
}>();
</script>
