<template>
  <div class="flex flex-wrap items-center justify-start gap-2">
    <template v-for="tag in tags" :key="tag">
      <div
        class="flex items-center justify-start gap-0.5 rounded-md border border-[#e6e8eb] bg-[#fefefe] px-3 py-2"
      >
        <p class="text-left text-sm text-[#646f7c]">
          {{ tag }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: [];
}>();

const tags = computed(() => {
  return props.tags;
});
</script>
