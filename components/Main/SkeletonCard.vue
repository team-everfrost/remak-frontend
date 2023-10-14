<template>
  <div
    class="animate-pulse flex w-full flex-col items-start justify-start overflow-hidden rounded-2xl border border-[#e6e8eb] bg-[#f8fafc] pb-4"
    :class="!image ? 'gap-0 pt-4' : 'gap-4 pt-0'"
    style="
      box-shadow:
        0px 0px 1px 0 rgba(65, 74, 82, 0.04),
        0px 2px 4px 0 rgba(102, 110, 119, 0.16);
    "
  >
    <div class="w-full bg-[#F4F6F8]">
      <img
        v-if="image"
        sizes="100vw"
        class="object-cover h-40 w-full mx-auto"
        src="assets/imageHolder.svg"
        alt="image placeholder"
        placeholder="assets/imageHolder.svg"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col items-start justify-start gap-5 mx-3.5 break-all">
      <div class="flex flex-col items-start justify-start gap-3">
        <p class="line-clamp-2 text-left text-base font-bold text-[#111]"></p>
        <p class="line-clamp-3 text-left text-sm text-[#646f7c]">
          <span class="text-left text-sm text-[#646f7c]"> </span>
        </p>
      </div>
      <div class="flex items-end justify-start gap-2">
        <p class="text-left text-xs text-[#646f7c]"></p>
        <div class="h-3 bg-[#646f7c]"></div>
        <p class="text-left text-xs text-[#646f7c]"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: boolean;
}>();
</script>
