<template>
  <div class="flex flex-wrap items-center justify-start gap-2">
    <template v-for="tag in tags" :key="tag">
      <NuxtLink :to="`/tag/${encodeURIComponent(tag)}`">
        <div
          class="flex items-center justify-start gap-0.5 rounded-md border border-[#e6e8eb] bg-[#fefefe] px-3 py-2 hover:bg-[#f5f5f5] hover:border-[#dcdcdc]"
        >
          <p class="text-left text-sm text-[#646f7c]">
            {{ tag }}
          </p>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: string[];
}>();

const tags = computed(() => {
  return props.tags;
});
</script>
