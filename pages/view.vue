<template>
  <div>
    <div class="flex h-screen w-screen flex-col">
      <div class="flex flex-grow">
        <div
          class="mt-20 w-full bg-[#f4f6f8] flex-col justify-center items-center"
        >
          <div
            class="flex mt-20 flex-col justify-center items-center mb-[170px]"
          >
            <div class="flex flex-col">
              <div class="flex justify-start items-start w-full">
                <button
                  class="flex flex-row justify-start items-center h-8 pl-2 pr-4"
                  @click="$router.back()"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="#1F8CE6"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <p
                    class="text-sm font-medium text-center ml-2 text-[#1f8ce6]"
                  >
                    이전으로 돌아가기
                  </p>
                </button>
              </div>
              <div class="mt-[24px] w-full">
                <AddAndViewMemoDetail v-show="docType === 'memo'" />
                <AddAndViewLinkDetail v-show="docType === 'link'" />
                <AddAndViewFileDetail v-show="docType === 'file'" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopBar />
    </div>
  </div>
</template>

<script setup lang="ts">
const docType = ref('file');
</script>
