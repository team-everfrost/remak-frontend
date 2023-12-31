<template>
  <HeadlessTransitionRoot appear :show="isOpen" as="template">
    <HeadlessDialog as="div" class="relative z-50" @close="closeModal">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-[480px] h-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <div
                class="flex max-w-[480px] min-h-[372px] w-full flex-col rounded-[20px] bg-white"
              >
                <div v-if="existType === 1">
                  <ModalAddList @change-component="handleChangeComponent" />
                </div>

                <div v-else-if="existType === 2">
                  <ModalAddLink
                    :url="url"
                    @change-component="handleChangeComponent"
                    @is-uploading="handleComponentWorking"
                  />
                </div>

                <div v-else-if="existType === 3">
                  <ModalAddFile
                    :files="files"
                    @change-component="handleChangeComponent"
                    @is-uploading="handleComponentWorking"
                  />
                </div>

                <div v-else-if="existType === 4">
                  <ModalAddMemo
                    :text="memo"
                    @change-component="handleChangeComponent"
                    @is-uploading="handleComponentWorking"
                  />
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { useDocumentStore } from '~/stores/document';

const existType = ref(1);
const isComponentWorking = ref(false);

const documentStore = useDocumentStore();

// Define the props
const props = defineProps<{
  isOpen: boolean;
  openType?: number;
  url?: string;
  files?: File[];
  memo?: string;
}>();

watch(
  () => props.isOpen,
  (newIsOpen) => {
    if (newIsOpen) {
      if (props.openType) {
        existType.value = props.openType;
      } else existType.value = 1;
    }
  },
);

const handleComponentWorking = (value: boolean) => {
  isComponentWorking.value = value;
};

const handleChangeComponent = (componentName: string) => {
  if (componentName === 'main') {
    existType.value = 1;
  } else if (componentName === 'link') {
    existType.value = 2;
  } else if (componentName === 'file') {
    existType.value = 3;
  } else if (componentName === 'memo') {
    existType.value = 4;
  } else if (componentName === 'cancel') {
    closeModal();
  }
};
// Define the emits
const emit = defineEmits<(e: 'update:isOpen', value: boolean) => void>();

// Update the 'closeModal' function to emit the updated 'isOpen' value
const closeModal = () => {
  if (isComponentWorking.value) {
    return;
  }
  emit('update:isOpen', false);
  if (existType.value !== 1) documentStore.setShouldFetch(true);
};
</script>
