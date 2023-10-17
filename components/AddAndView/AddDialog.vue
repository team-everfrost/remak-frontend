<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class=" flex max-w-[480px] w-full flex-col rounded-[20px] bg-white"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div v-if="existType === 1">
      <AddAndViewDialogMain @change-component="handleChangeComponent" />
    </div>

    <div v-else-if="existType === 2">
      <AddAndViewAddLinkDialog @change-component="handleChangeComponent" />
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

const existType = ref(1);

const handleChangeComponent = (componentName: string) => {
  if (componentName === 'main') {
    existType.value = 1;
  } else if (componentName === 'link') {
    existType.value = 2;
  } else if (componentName === 'file') {
    existType.value = 3;
  } else if (componentName === 'image') {
    existType.value = 4;
  } else if (componentName === 'cancel') {
    console.log('cancel');
    emit('cancel');
  }
};

const emit = defineEmits<{
  (e: 'cancel' | 'link' | 'file' | 'image' | 'memo'): void;
}>();
</script>
