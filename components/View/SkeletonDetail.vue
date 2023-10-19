<template>
  <div
    class="flex items-center justify-center rounded-2xl border border-[#e6e8eb] bg-[#fefefe] px-10 pb-12 pt-10"
  >
    <div class="flex w-full flex-col justify-start animate-pulse">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start gap-2 h-3"></div>
        <button class="ml-auto">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="flex mt-4 h-60 items-center justify-center gap-2.5 self-stretch rounded-xl border border-[#e6e8eb] bg-[#F4F6F8]"
      ></div>
      <p class="text-left text-[28px] font-bold text-[#111] mt-4 mb-8"></p>
      <div class="flex items-start justify-start gap-3">
        <template
          v-for="number in [...Array(4).keys()].map((i) => i + 1)"
          :key="number"
        >
          <div
            class="flex h-9 w-20 items-center justify-start gap-0.5 rounded-md border border-[#e6e8eb] bg-[#fefefe] px-3 py-2"
          ></div>
        </template>
      </div>
      <div>
        <div
          class="mt-9 mb-4 text-left text-base font-bold h-6 w-8 rounded-md bg-[#F4F6F8]"
        ></div>
        <div
          class="flex items-start justify-start gap-2.5 self-stretch rounded-xl border border-[#e6e8eb] bg-[#fefefe] px-4 py-5 h-24"
        >
          <p class="flex-grow text-left text-sm font-medium text-[#111]"></p>
        </div>
      </div>
      <div>
        <div
          class="mt-6 mb-4 flex-shrink-0 flex-grow-0 text-left text-base font-bold text-[#28323c] h-6 w-8 bg-[#F4F6F8]"
        ></div>
        <div class="prose md:prose-lg lg:prose-xl max-w-none h-96"></div>
      </div>
      <div>
        <div
          class="mt-12 flex h-[52px] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-300"
        >
          <p class="flex-grow text-center text-lg font-bold text-white"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
